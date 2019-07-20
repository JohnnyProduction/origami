import * as request from "supertest";
import { TService, startService, stopService } from "../service";
import { TDBConnection } from "../database";
import { TEST_CONFIG } from "./testing";

type TModel = {
    code: string;
}

export const testReadRoute = <T extends TModel>(
    name: string,
    path: string,
    insertItem: (db:TDBConnection, item: T) => Promise<void>,
    createItem: (index: number) => T,
) => {
    describe("Read", () => {
        let service: TService;

        beforeEach(async () => {
            service = await startService(TEST_CONFIG);
        });

        afterEach(async () => {
            await stopService(service);
        });

        it(`Должен возвращать ${name} по code`, async () => {
            const item: T = createItem(0);

            await insertItem(service.db, item);

            await request
                .agent(service.server.info.uri)
                .get(`${path}/${item.code}`)
                .set('Accept', 'application/json')
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(item));
        });
        it(`Должен возвращать 404 для не существующего ${name}`, async () => {
            const code = "some_not_exist_code";

            await request
                .agent(service.server.info.uri)
                .get(`${path}/${code}`)
                .set('Accept', 'application/json')
                .expect("Content-Type", /json/)
                .expect(404, {
                    error: {
                        description: `${name} with code ${code} not found`,
                        code: 404,
                    }
                });
        });
    });
};

export const testReadAllRoute = <T extends TModel>(
    name: string,
    path: string,
    insertItem: (db:TDBConnection, item: T) => Promise<void>,
    createItem: (index: number) => T,
) => {
    describe("Read All", () => {
        let service: TService;

        beforeEach(async () => {
            service = await startService(TEST_CONFIG);
        });

        afterEach(async () => {
            await stopService(service);
        });

        it(`Должен возвращать список всех ${name}`, async () => {
            const item_0: T = createItem(0);
            const item_1: T = createItem(1);

            await insertItem(service.db, item_0);
            await insertItem(service.db, item_1);

            await request
                .agent(service.server.info.uri)
                .get(`${path}`)
                .set('Accept', 'application/json')
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify([item_0, item_1]));
        });
        it(`Должен возвращать пустой список при отсутствии ${name}`, async () => {
            await request
                .agent(service.server.info.uri)
                .get(`${path}`)
                .set('Accept', 'application/json')
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify([]));
        });
    });
};

export const testCreateRoute = <T extends TModel>(
    name: string,
    path: string,
    getItemByCode: (db:TDBConnection, code: string) => Promise<T|undefined>,
    insertItem: (db:TDBConnection, item: T) => Promise<void>,
    createItem: (index: number) => T,
) => {
    describe("Create", () => {
        let service: TService;

        beforeEach(async () => {
            service = await startService(TEST_CONFIG);
        });
    
        afterEach(async () => {
            await stopService(service);
        });

        it(`Должен создавать ${name} по параметрам`, async () => {
            const item: T = createItem(0);

            await request
                .agent(service.server.info.uri)
                .post(`${path}`)
                .set('Accept', 'application/json')
                .send(item)
                .expect("Content-Type", /json/)
                .expect(201, {
                    meta: {
                        description: `${name} with code ${item.code} was created`,
                        ref: `${path}/${item.code}`,
                    },
                });
            
            const actual = await getItemByCode(service.db, item.code);    
            
            expect(actual).toEqual(item);
        });
        it(`Если такой ${name} уже существует должен выдать ошибку`, async () => {
            const item: T = createItem(0);

            await insertItem(service.db, item);

            await request
                .agent(service.server.info.uri)
                .post(`${path}`)
                .set('Accept', 'application/json')
                .send(item)
                .expect("Content-Type", /json/)
                .expect(409, {
                    error: {
                        description: `${name} with code ${item.code} already exists`,
                        code: 409,
                    },
                });
        });
    });
};

export const testDeleteRoute = <T extends TModel>(
    name: string,
    path: string,
    getItemByCode: (db:TDBConnection, code: string) => Promise<T|undefined>,
    insertItem: (db:TDBConnection, item: T) => Promise<void>,
    createItem: (index: number) => T,
) => {
    describe("Delete", () => {
        let service: TService;

        beforeEach(async () => {
            service = await startService(TEST_CONFIG);
        });
    
        afterEach(async () => {
            await stopService(service);
        });
    
        it(`Должен удалять ${name} по code`, async () => {
            const item: T = createItem(0);
    
            await insertItem(service.db, item);
    
            await request
                .agent(service.server.info.uri)
                .delete(`${path}/${item.code}`)
                .set('Accept', 'application/json')
                .expect("Content-Type", /json/)
                .expect(200, {
                    meta: {
                        description: `${name} with code ${item.code} was deleted`
                    }
                });

            const actual = await getItemByCode(service.db, item.code);

            expect(actual).toBeUndefined();
        });
        it(`Должен вернуть 404 при удалении не существующего ${name}`, async () => {
            const item_code = "some_no_exist_code";
    
            await request
                .agent(service.server.info.uri)
                .delete(`${path}/${item_code}`)
                .set('Accept', 'application/json')
                .expect("Content-Type", /json/)
                .expect(404, {
                    error: {
                        description: `${name} with code ${item_code} not found`,
                        code: 404,
                    }
                });
        });
    });
};
