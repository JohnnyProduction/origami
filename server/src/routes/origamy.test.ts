import { testCreateRoute } from "../utils/route_testing";
import { ORIGAMY_NAME, ORIGAMY_PATH } from "./origamy";
import { getOrigamyByCode, insertOrigamy, TOrigamy } from "../model/origamy";

const createOrigamy = (name_suf: string | number): TOrigamy => () => {

}


describe("routes", () => {
    describe("origamy", () => {
        testCreateRoute(
            ORIGAMY_NAME,
            ORIGAMY_PATH,
            getOrigamyByCode,
            insertOrigamy,
            createOrigamy,
        );
    });
});
