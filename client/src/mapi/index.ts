import Parse from "parse";
import { IConfig, CONFIG } from "../config";
import { OrigamyMapi } from "./origamy";

export class Mapi {

    public readonly Origamy = new OrigamyMapi();
}

export const MAPI = new Mapi();