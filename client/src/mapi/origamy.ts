import Parse from "parse";

export interface IMapiOrigamy extends Parse.Object {
    name: string;
}

export class OrigamyMapi {
    private ParseOrigamy = Parse.Object.extend("Origamy"); 

    public getById(id: string): Promise<IMapiOrigamy | undefined> {
        const query = new Parse.Query<IMapiOrigamy>(this.ParseOrigamy);
        query.equalTo("objectId", id);
        return query.first();
    }
}
