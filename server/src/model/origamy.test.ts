import { TEST_CONFIG } from "../utils/testing";
import { insertOrigamy, TShortOrigamy, getOrigamyPage } from "./origamy";
import { openDBConnection, applyDBSchema, closeDBConnection } from "../database";

const createOrigamy = (i: number): TShortOrigamy => ({
    code: `code_${i}`,
    name: `name_${i}`,
    complexity: i % 3,
    duration: i,
});

const createOrigamies = (count: number): TShortOrigamy[] => {
    const result = [];

    for (let i = 0; i < count; i++) {
        result.push(createOrigamy(i));
    }

    return result;
}

describe("model", () => {
    describe("origamy", () => {
        describe("getOrigamyPage", () => {
            it("Должен найти без сортировки и матчинга", async () => {
                const from = 0;
                const to = 5;

                const db = await openDBConnection(TEST_CONFIG);
                await applyDBSchema(db);

                const origamies = createOrigamies(10);

                for (let i = 0; i < origamies.length; i++) {
                    await insertOrigamy(db, origamies[i]);
                }

                const foundPage = await getOrigamyPage(db, from, to, {fieldName: "name"});

                expect(foundPage.from).toEqual(from);
                expect(foundPage.to).toEqual(to);
                expect(foundPage.total).toEqual(origamies.length);
                expect(foundPage.data).toEqual(origamies.slice(from, to));

                await closeDBConnection(db);
            });
            // it("Должен найти без матчинга но с сортировкой", async () => {
            //     const from = 0;
            //     const to = 5;

            //     const db = await openDBConnection(TEST_CONFIG);
            //     await applyDBSchema(db);

            //     const origamies = createOrigamies(10);

            //     for (let i = 0; i < origamies.length; i++) {
            //         await insertOrigamy(db, origamies[i]);
            //     }

            //     const foundPage = await getOrigamyPage(db, from, to, {fieldName: "complexity"});

            //     const expected = origamies
            //         .sort((a, b) => a.complexity - b.complexity)
            //         .slice(from, to);

            //     console.log(foundPage, expected);    

            //     expect(foundPage.from).toEqual(from);
            //     expect(foundPage.to).toEqual(to);
            //     expect(foundPage.total).toEqual(origamies.length);
            //     expect(foundPage.data).toEqual(expected);

            //     await closeDBConnection(db);
            // });
        });
    });
});
