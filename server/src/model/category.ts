import { Model, DataTypes } from "sequelize";

export class Category extends Model {
    name!: string;
    image!: string;
    rating!: number;
    complexity!: number;
    duration!: Number;
}


import { Database } from "../database";

export const initCategories = (database: Database) => {
    Category.init({
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        image: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        rating: {
            type: new DataTypes.TINYINT(),
            allowNull: false,
        },
        complexity: {
            type: new DataTypes.TINYINT(),
            allowNull: false,
        },
        duration: {
            type: new DataTypes.TINYINT(),
            allowNull: false,
        },
    }, {
        tableName: "categories",
        modelName: "category",
        sequelize: database.sequelize,
    });
};
