import { IPagingFilter, IPage } from "./paging";
import axios from "axios";

export interface IMapiOrigamyStep {
    step: number;
    photos: string[];
    description: string;
}

export interface IMapiOrigamy {
    code: string;
    base?: IMapiOrigamy;
    name: string;
    duration: number;
    complexity: number;
    rating: number;
    preview: string;
}

export class OrigamyMapi {
    public getByFilter(filter: IPagingFilter): Promise<IPage<IMapiOrigamy>> {
        const params:any = {
            _limit: filter.limit,
            _start: filter.start
        }

        if (filter.sort) {
            if (filter.sort.desc) {
                params["_sort"] = `${filter.sort.fieldName}:DESC`;
            } else {
                params["_sort"] = `${filter.sort.fieldName}:ASC`;
            }
        }

        if (filter.match) {
            const match = filter.match;
            Object.keys(filter.match).forEach(key => {
                const values = match[key];

                for (let i = 0; i < values.length; i++) {
                    params[`${key}_contains`] = values[i];
                }
            });
        }

        return axios.get("http://localhost:1337/origamies", {params})
            .then(result => ({
                limit: filter.limit,
                start: filter.start,
                data: result.data,
            }));
    }
}
