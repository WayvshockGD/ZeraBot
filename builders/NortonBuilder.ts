import Eris from "eris";
import { CommandManager } from "../src/ComandManager";
import { Plugins } from "../start";

function getToken(options: BuilderOptions<Plugins>) {
    return options.development 
          ? options.plugins.config.get("betaToken") 
          : options.plugins.config.get("token");
}

export = class NortonBuilder<PLUGINS extends Plugins> extends Eris.Client {
    public commands: CommandManager;
    public nortonOptions: BuilderOptions<PLUGINS>;

    public constructor(options: BuilderOptions<PLUGINS>) {
        super(getToken(options), {
            restMode: true,
            intents: [
                "guilds", 
                "guildMembers", 
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

        this.nortonOptions = options;
    }

    public isType(): DevelopmentType {
        return this.nortonOptions.development ? "Development" : "Production";
    }

    public get plugins() {
        return this.nortonOptions.plugins;
    }
}

type DevelopmentType = "Development" | "Production";

interface BuilderOptions<P> {
    development: boolean;
    plugins: P;
}