import { strict } from "joi";

export const parseNumberQuery = (q: string | string[]): number | undefined => {
    if(Array.isArray(q)) {
        return undefined;
    }

    return Number.parseInt(q);
};
