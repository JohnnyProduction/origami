import { strict } from "joi";

export const parseNumberQuery = (q: string | string[]): number => {
    if(Array.isArray(q)) {
        throw new Error(`Param ${q} not be array`);
    }

    return Number.parseInt(q);
};

export const parseStringQuery = (q: string | string[]): string => {
    if(Array.isArray(q)) {
        throw new Error(`Param ${q} not be array`);
    }

    return q + "";
};

export const parseBooleanQuery = (q: any): boolean => {
    if(Array.isArray(q)) {
        throw new Error(`Param ${q} not be array`);
    }

    return !!q;
};
