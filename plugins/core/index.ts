import { createPlugin } from "../CommandBuilder";
import Ping from "./Ping";

export = createPlugin({
    name: "core",
    description: "The core plugin of the bot. Cannot be turned off.",
    canBeTurnedOff: false,
    enabled: true,
    commands: [
        Ping
    ]
});