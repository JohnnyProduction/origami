import { Database } from "../database";
import { Model, DataTypes, Association, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin } from "sequelize";
import { ImageModel } from "./image";

export class OrigamyPointModel extends Model {
    public static initialize(database: Database) {
        OrigamyPointModel.init({
            id: {
                type: new DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
            },
            number: {
                type: new DataTypes.INTEGER(),
            },
            description: {
                type: new DataTypes.STRING(),
                allowNull: false,
            },
        }, {
            tableName: "origamy_points",
            modelName: "origamy_point",
            sequelize: database.sequelize,
        });

        OrigamyPointModel.hasOne(ImageModel, {
            as: "photo",
        });
    }

    public id!: number;
    public number!: number;
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.

    public getPhoto!: HasOneGetAssociationMixin<ImageModel>; // Note the null assertions!
    public setPhoto!: HasOneSetAssociationMixin<ImageModel, string>;
    public createPhoto!: HasOneCreateAssociationMixin<ImageModel>;

    public static associations: {
        photos: Association<OrigamyPointModel, ImageModel>;
    };

    public async toPlain() {
        return {
            id: this.id,
            number: this.number,
            description: this.description,
            photo: (await this.getPhoto()).toPlain(),
        }
    }
}
