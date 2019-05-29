import { Model, DataTypes } from "sequelize";
import { Database } from "../database";

export interface ICategoryModel {
    name: string;
    image: string;
    rating: number;
}

export class CategoryModel extends Model {
    public static initialize(database: Database) {
        CategoryModel.init({
            id: {
                type: new DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
            },
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
        }, {
            tableName: "categories",
            modelName: "category",
            sequelize: database.sequelize,
        });
    }

    public id!: number;
    public name!: string;
    public image!: string;
    public rating!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public toPlain() {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            rating: this.rating,
        }
    }
}

