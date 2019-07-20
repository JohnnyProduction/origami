import { insertAutor, TAutor, getAutorByCode } from "../model/autor";
import { AUTOR_PATH, AUTOR_NAME } from "./autor";
import { testReadRoute, testCreateRoute, testReadAllRoute, testDeleteRoute } from "../utils/route_testing";

const createItem = (i: number): TAutor => ({
    code: `autor_${i}`,
    name: `autor ${i}`,
});

describe("routes", () => {
    describe("autor", () => {
        testReadRoute(
            AUTOR_NAME,
            AUTOR_PATH,
            insertAutor,
            createItem,
        );
        testReadAllRoute(
            AUTOR_NAME,
            AUTOR_PATH,
            insertAutor,
            createItem,
        );
        testCreateRoute(
            AUTOR_NAME,
            AUTOR_PATH,
            getAutorByCode,
            insertAutor,
            createItem,
        );
        testDeleteRoute(
            AUTOR_NAME,
            AUTOR_PATH,
            getAutorByCode,
            insertAutor,
            createItem,
        );
    });
});
