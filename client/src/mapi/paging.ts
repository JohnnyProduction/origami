export interface IFilter {
    from: number;
    to: number;
    sort?: {
        fieldName: string;
        desc?: boolean;
    }
    match?: {
        [fieldName: string]: any;
    }
}

export interface IPage<T> {
    from: number;
    to: number;
    total: number;
    data: T[];
}