import ZeraBuilder from "./builders/ZeraBuilder";
import { ConfigPlugin, LoggerPlugin } from "./ClientPlugins";
import dotenv from "dotenv";
import Eris from "eris";
dotenv.config();

import ReadyEvent from "./events/ReadyEvent";
import MessageEvent from "./events/MessageEvent";

type ConfigNames = "prefix" | "token" | "betaToken" | "dbHost" | "dbName";

export interface Plugins {
    config: ConfigPlugin<ConfigNames>;
    logger: LoggerPlugin;
}

loadClient();

async function loadClient() {
    let client = new ZeraBuilder<Plugins>({
        plugins: {
            config: new ConfigPlugin(),
            logger: new LoggerPlugin()
        },
        development: isDevelopment()
    });

    await client.commands.load();
    await initEvents(client);

    await client.connect().catch(() => {
        client.plugins.logger.error({
            message: "Unable to connect to gateway",
            hasBold: true
        });
    });
}

async function initEvents(client: ZeraBuilder<Plugins>) {
    let db = await client.initDB({ 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: process.env.DB_USER!, 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        password: process.env.DB_PASSWORD!
    });

    client.on("ready", () => ReadyEvent(client, db));
    client.on("messageCreate", (message: Eris.Message) => MessageEvent(client, message, db));
}

function isDevelopment() {
    return process.env.MODE === "DEVELOPMENT";
}