import { Route } from "./route";
import { ResponseToolkit, Request } from "hapi";
import { AutorModel } from "../model/autor";
import { parseNumberQuery } from "../utils/parse_query";

export class AutorRoute extends Route {
    static PATH = "/autor";
    public getHapiRoute() {
        return {
            method: "GET",
            path: AutorRoute.PATH,
            options: {
                tags: ['api'],
                description: 'My route description',
                notes: 'My route notes',
            },
            handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                const id = parseNumberQuery(request.query.id);
                const autor = await AutorModel.findByPk(id);

                if (autor) {
                    return h.response(JSON.stringify(autor.toPlain())).type("application/json");
                }
            },
        };
    }
}
