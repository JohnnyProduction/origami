import { Route } from "./route";
import { ResponseToolkit, Request } from "hapi";
import { AutorModel } from "../model/autor";

export class AutorRoute extends Route {
    static PATH = "/autor";
    public getHapiRoute() {
        return {
            method: "GET",
            path: AutorRoute.PATH,
            handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                const id = Number.parseInt(request.query.id as string);
                const autor = await AutorModel.findByPk(id);

                return h.response(JSON.stringify(autor.toPlain())).type("application/json");
            }
        };
    }
}
