import { IPagingFilter, IPage } from "./paging";
import { ORIGAMY_MOCK } from "./mock";

export interface IMapiOrigamyStep {
    step: number;
    photos: string[];
    description: string;
}

export interface IMapiOrigamy {
    id: string;
    name: string;
    description: string;
    duration: number;
    complexity: number;
    rating: number;
    photos: string[];
    steps: IMapiOrigamyStep[];
}

export class OrigamyMapi {
    public getByFilter(filter: IPagingFilter): Promise<IPage<IMapiOrigamy>> {
        return new Promise((resolve) => {
            const filtered = ORIGAMY_MOCK.filter(o => {
                if (filter.match) {
                    const keys = Object.keys(filter.match);
                    for(let i = 0; i < keys.length; i++) {
                        if(typeof filter.match[keys[i]] === "string") {
                            if (o[keys[i]].toLocaleLowerCase().indexOf(filter.match[keys[i]].toLocaleLowerCase()) < 0) {
                                return false;
                            }
                        } else {
                            if (o[keys[i]] === filter.match[keys[i]]) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            });

            if (filter.sort) {
                    const sort = filter.sort;
                    filtered.sort((a, b) => {
                        if (sort.desc) {
                            return a[sort.fieldName] < b[sort.fieldName] ? 1 : -1;
                        } else {
                            return a[sort.fieldName] > b[sort.fieldName] ? 1 : -1;
                        }
                    });
            }

            setTimeout(() => resolve({
                total: filtered.length,
                from: filter.from,
                to: filter.to,
                data: filtered.splice(filter.from, filter.to),
            }), 600);
        });
    }
}
