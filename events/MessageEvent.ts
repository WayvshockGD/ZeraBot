import Eris from "eris";
import NortonBuilder from "../builders/NortonBuilder";
import { Plugins } from "../start";

export = function(client: NortonBuilder<Plugins>, message: Eris.Message) {
    let prefix = client.plugins.config.get("prefix");
}