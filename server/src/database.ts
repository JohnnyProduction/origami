import { IDatabaseConfig } from "config";
import { Sequelize } from "sequelize";

export class Database {
    public sequelize: Sequelize;

    constructor(config: IDatabaseConfig) {
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: config.sqlitePath,
            logging: false,
        });

    }

    async open() {
        await this.sequelize.sync();
    }

    async close() {
        await this.sequelize.close();
    }
}