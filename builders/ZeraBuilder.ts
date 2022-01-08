import Eris from "eris";
import knex from "knex";
import { CommandManager } from "../src/ComandManager";
import { Plugins } from "../start";

function getToken(options: BuilderOptions<Plugins>) {
    return options.development 
          ? options.plugins.config.get("betaToken") 
          : options.plugins.config.get("token");
}

export = class ZeraBuilder<PLUGINS extends Plugins> extends Eris.Client {
    public commands: CommandManager;
    public zerOptions: BuilderOptions<PLUGINS>;

    public constructor(options: BuilderOptions<PLUGINS>) {
        super(getToken(options), {
            restMode: true,
            intents: [
                "guilds", 
                "guildMembers",
                "guildMessages", 
                "guildInvites", 
                "guildMessageTyping", 
                "directMessages",
                "guildMessageTyping",
                "guildBans",
                "guildMessageReactions",
                "allPrivileged"
            ]
        });

        this.commands = new CommandManager();

        this.zerOptions = options;
    }

    public isType(): DevelopmentType {
        return this.zerOptions.development ? "Development" : "Production";
    }

    public get plugins() {
        return this.zerOptions.plugins;
    }

    public async initDB(opt: DBOptions) {
        return knex({ 
            client: "mysql",
            connection: {
                database: this.plugins.config.get("dbName"),
                host: this.plugins.config.get("dbHost"),
                user: opt.user,
                password: opt.password
            }
        })
    }
}

type DevelopmentType = "Development" | "Production";

interface BuilderOptions<P> {
    development: boolean;
    plugins: P;
}

interface DBOptions {
    user: string;
    password: string;
}