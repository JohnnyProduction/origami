import { IDatabaseConfig } from "config";
import { Database } from "./database";

describe("Database", () => {
    describe("open", () => {
        it("Должен удачно открывать соединение", async () => {
            const config: IDatabaseConfig = {
                sqlitePath: ":memory:",
            }
            const database = new Database(config);

            await database.open();

            await expect(database.sequelize.authenticate()).resolves.toBeUndefined();
        });
    });
});