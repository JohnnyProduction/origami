import * as request from "supertest";
import { createTestServer, TestCRUDRoute } from "../utils/testing";
import { AutorRoute } from "./autor";
import { Database } from "../database";
import { AutorModel } from "../model/autor";
import { Server } from "../server";

describe("routes", () => {
    TestCRUDRoute(
        "Autor",
        AutorModel,
        AutorRoute,
        () => ({
            id: 5545,
            name: "autor name",
            avatar: "some url",
        }),
    );
});
