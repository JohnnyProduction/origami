"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class CategoryModel extends sequelize_1.Model {
    static initialize(database) {
        CategoryModel.init({
            id: {
                type: new sequelize_1.DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            image: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            rating: {
                type: new sequelize_1.DataTypes.TINYINT(),
                allowNull: false,
            },
        }, {
            tableName: "categories",
            modelName: "category",
            sequelize: database.sequelize,
        });
    }
    toPlain() {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            rating: this.rating,
        };
    }
}
exports.CategoryModel = CategoryModel;
