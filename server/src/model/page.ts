export type TPageSort = {
    fieldName: string;
    desc?: boolean
}

// На данный момент не используется из-за сложности реализации запросов к БД
export type TPageFilter = {
    from: number,
    to: number,
    match?: {
        [key: string]: any,
    },
    sort?: TPageSort,
}

export type TPage<T> = {
    from: number,
    to: number,
    total: number,
    data: T[]
}