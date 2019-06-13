import { getReadRoute } from "./route";
import { getOrigamyByCode } from "model/origamy";
import { TDBConnection } from "database";

export const ORIGAMY_PATH = "/origamy";

export const createOrigamyReadRoute = (db: TDBConnection) => getReadRoute(db, {
    name: "Origamy",
    path: ORIGAMY_PATH,
    description: "Получить оригами",
    notes: "Возвращает полную информацию конкретной оригами по code",
    getItemByCode: getOrigamyByCode,
});
