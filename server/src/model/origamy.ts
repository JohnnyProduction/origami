import { Database } from "../database";
import { Model, DataTypes, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin } from "sequelize";
import { ImageModel } from "./image";
import { OrigamyPointModel } from "./origamy_point";
import { CategoryModel } from "./category";
import { AutorModel } from "./autor";

export class OrigamyModel extends Model {
    public static initialize(database: Database) {
        OrigamyModel.init({
            id: {
                type: new DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            description: {
                type: new DataTypes.STRING(),
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
            tableName: "origamies",
            modelName: "origamy",
            sequelize: database.sequelize,
        });

        OrigamyModel.hasMany(ImageModel, { 
            as: "photos",
        });
        OrigamyModel.hasMany(OrigamyPointModel, { 
            as: "points",
        });
        OrigamyModel.hasMany(CategoryModel, { 
            as: "categories",
        });
        OrigamyModel.hasOne(AutorModel, {
            as: "autor",
        });
    }

    public id!: number;
    public name!: string;
    public description!: string;
    public rating!: number;
    public complexity!: number;
    public duration!: Number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.

    public getPhotos!: HasManyGetAssociationsMixin<ImageModel>; // Note the null assertions!
    public addPhoto!: HasManyAddAssociationMixin<ImageModel, string>;
    public hasPhoto!: HasManyHasAssociationMixin<ImageModel, string>;
    public countPhotos!: HasManyCountAssociationsMixin;
    public createPhoto!: HasManyCreateAssociationMixin<ImageModel>;

    public getPoints!: HasManyGetAssociationsMixin<OrigamyPointModel>; // Note the null assertions!
    public addPoint!: HasManyAddAssociationMixin<OrigamyPointModel, number>;
    public hasPoint!: HasManyHasAssociationMixin<OrigamyPointModel, number>;
    public countPoints!: HasManyCountAssociationsMixin;
    public createPoint!: HasManyCreateAssociationMixin<OrigamyPointModel>;

    public getCategories!: HasManyGetAssociationsMixin<CategoryModel>; // Note the null assertions!
    public addCategory!: HasManyAddAssociationMixin<CategoryModel, number>;
    public hasCategory!: HasManyHasAssociationMixin<CategoryModel, number>;
    public countCategories!: HasManyCountAssociationsMixin;
    public createCategory!: HasManyCreateAssociationMixin<CategoryModel>;

    public getAutor!: HasOneGetAssociationMixin<AutorModel>; // Note the null assertions!
    public setAutor!: HasOneSetAssociationMixin<AutorModel, number>;
    public createAutor!: HasOneCreateAssociationMixin<AutorModel>;

    public static associations: {
        photos: Association<OrigamyModel, ImageModel>;
        points: Association<OrigamyModel, OrigamyPointModel>;
        categories: Association<OrigamyModel, CategoryModel>;
        autor: Association<OrigamyModel, AutorModel>;
    };

    public async toPlain() {
        const autorModel = await this.getAutor();
        const autor = autorModel.toPlain();

        const categoriesModels = await this.getCategories();
        const categories = categoriesModels.map(category => category.toPlain());

        const photosModels = await this.getPhotos();
        const photos = photosModels.map(photo => photo.toPlain());

        const pointsModels = await this.getPoints();
        const points = [];

        for(let i = 0; i < pointsModels.length; i++) {
            points.push(await pointsModels[i].toPlain());
        }

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            rating: this.rating,
            complexity: this.complexity,
            duration: this.duration,
            autor,
            categories,
            photos,
            points,
        };
    }
}
