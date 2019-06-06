import Parse from "parse";
import { IMapiImage, IParseImage } from "./image";
import { IPagingFilter, IPage } from "./paging";

export interface IMapiFullOrigamy {
    name: string;
    duration: number;
    complexity: number;
    rating: number;
    preview: string;
    photos: IMapiImage[];
    // popints: any
}

export interface IMapiOrigamy {
    name: string;
    duration: number;
    complexity: number;
    rating: number;
    preview: string;
}

export interface IParseOrigamy extends Parse.Object {
    name: string;
    duration: number;
    complexity: number;
    rating: number;
    preview: string;
}

export class OrigamyMapi {
    private ParseOrigamy = Parse.Object.extend("Origamy"); 

    // public getById(id: string): Promise<IMapiFullOrigamy | undefined> {
    //     const query = new Parse.Query<IParseOrigamy>(this.ParseOrigamy);

    //     query.equalTo("objectId", id);

    //     return query.first().then(origamy => {
    //         if (!origamy) {
    //             return origamy;
    //         }

    //         return origamy.photos.query().find().then((images) => ({
    //             name: origamy.name,
    //             duration: origamy.duration,
    //             complexity: origamy.complexity,
    //             rating: origamy.rating,
    //             preview: origamy.preview,
    //             photos: images.map(img => ({url: img.url})),
    //         }));
    //     });
    // }

    public getByFilter(filter: IPagingFilter): Promise<IPage<IMapiOrigamy>> {
        const query = new Parse.Query<IParseOrigamy>(this.ParseOrigamy);

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

        return Promise.all([
            query.find().then(origamies => (origamies.map((origamy) => ({
                name: origamy.name,
                duration: origamy.duration,
                complexity: origamy.complexity,
                rating: origamy.rating,
                preview: origamy.preview,
            })))),
            query.count(),
        ]).then(([data, total]) => ({
            from: filter.from,
            to: filter.to,
            total,
            data,
        }));
    }
}
