"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class AutorModel extends sequelize_1.Model {
    static initialize(database) {
        super.init({
            id: {
                type: new sequelize_1.DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            avatar: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: true,
            }
        }, {
            tableName: "autors",
            modelName: "autor",
            sequelize: database.sequelize,
        });
    }
    toPlain() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
        };
    }
}
exports.AutorModel = AutorModel;
