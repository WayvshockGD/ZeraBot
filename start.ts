import NortonBuilder from "./builders/NortonBuilder";
import { ConfigPlugin, LoggerPlugin } from "./ClientPlugins";
import dotenv from "dotenv";
import Eris from "eris";
dotenv.config();

import ReadyEvent from "./events/ReadyEvent";
import MessageEvent from "./events/MessageEvent";

type ConfigNames = "prefix" | "token" | "betaToken";

export interface Plugins {
    config: ConfigPlugin<ConfigNames>;
    logger: LoggerPlugin;
}

loadClient();

async function loadClient() {
    let client = new NortonBuilder<Plugins>({
        plugins: {
            config: new ConfigPlugin(),
            logger: new LoggerPlugin()
        },
        development: isDevelopment()
    });

    await client.commands.load();
    initEvents(client);

    await client.connect().catch(() => {
        client.plugins.logger.error({
            message: "Unable to connect to gateway",
            hasBold: true
        });
    });
}

function initEvents(client: NortonBuilder<Plugins>) {
    client.on("ready", () => ReadyEvent(client));
    client.on("messageCreate", (message: Eris.Message) => MessageEvent(client, message));
}

function isDevelopment() {
    return process.env.MODE === "DEVELOPMENT";
}