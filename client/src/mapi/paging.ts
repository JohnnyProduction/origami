export interface IPagingFilter {
    start: number;
    limit: number;
    sort?: {
        fieldName: string;
        desc?: boolean;
    }
    match?: {
        [fieldName: string]: string[];
    }
}

export interface IPage<T> {
    start: number;
    limit: number;
    data: T[];
}

export interface IImage {
    url: string;
}