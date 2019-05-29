import { Database } from "../database";
import { Model, DataTypes } from "sequelize";

export class ImageModel extends Model {
    public static initialize(database: Database) {
        super.init({
            url: {
                type: new DataTypes.STRING(256),
                primaryKey: true,
            },
        }, {
            tableName: "images",
            modelName: "image",
            sequelize: database.sequelize,
        });
    }

    public url!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public toPlain() {
        return {
            url: this.url,
        }
    }
}
