import Parse from "parse";

export interface IMapiImage {
    url: string;
}

export interface IParseImage extends Parse.Object {
    url: string;
}