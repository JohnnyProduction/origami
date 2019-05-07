import { Model, DataTypes } from "sequelize";

export class AutorModel extends Model {
    public id!: number;
    public name!: string;
    public avatar!: string | null;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public toPlain() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
        }
    }
}


import { Database } from "../database";

export const initAutors = (database: Database) => {
    AutorModel.init({
        id: {
            type: new DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        avatar: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        }
    }, {
        tableName: "autors",
        modelName: "autor",
        sequelize: database.sequelize,
    });
};
