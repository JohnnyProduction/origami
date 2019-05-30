import Parse from "parse";
import { IConfig, CONFIG } from "../config";
import { OrigamyMapi } from "./origamy";

export class Mapi {
    constructor(config: IConfig) {
        Parse.initialize(config.appId, config.appKey);
        Parse.serverURL = config.mapiEndPoint; 
    }

    public readonly Origamy = new OrigamyMapi();
}

export const MAPI = new Mapi(CONFIG);