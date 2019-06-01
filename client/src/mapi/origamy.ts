import Parse from "parse";
import { IMapiImage } from "./image";
import { IFilter, IPage } from "./paging";

export interface IMapiOrigamy extends Parse.Object {
    name: string;
    duration: number;
    complexity: number;
    rating: number;
    photos: Parse.Relation<IMapiOrigamy, IMapiImage>;
}

export class OrigamyMapi {
    private ParseOrigamy = Parse.Object.extend("Origamy"); 

    public getById(id: string): Promise<IMapiOrigamy | undefined> {
        const query = new Parse.Query<IMapiOrigamy>(this.ParseOrigamy);

        query.equalTo("objectId", id);

        return query.first();
    }

    public getByFilter(filter: IFilter): Promise<IPage<IMapiOrigamy>> {
        const query = new Parse.Query<IMapiOrigamy>(this.ParseOrigamy);

        query.skip(filter.from);
        query.limit(filter.to - filter.from);
        
        if (filter.match) {
            Object.keys(filter.match).forEach(fieldName => {
                const fieldValue = (filter.match as any)[fieldName];

                if(typeof fieldValue === "string") {
                    query.fullText(fieldName, fieldValue);
                } else {
                    query.equalTo(fieldName, fieldValue);
                }
            });
        }

        if (filter.sort) {
            if (filter.sort.desc) {
                query.descending(filter.sort.fieldName);
            } else {
                query.ascending(filter.sort.fieldName);
            }
        }

        return Promise.all([query.find(), query.count()]).then(([data, total]) => ({
            from: filter.from,
            to: filter.to,
            total,
            data,
        }));
    }
}
