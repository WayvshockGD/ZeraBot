import Collection from "@discordjs/collection";
import { glob } from "glob-promise";
import { CommandDataOptions, PluginDataOptions } from "../types/CommandTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CommandManager extends Collection<string, CommandDataOptions> {
    public plugins: Collection<string, PluginDataOptions>;

    public constructor() {
        super();

        this.plugins = new Collection()
    }

    load() {
        return new Promise<boolean>((resolve, reject) => {
            glob("./build/plugins/**/index.js", (err, files) => {
                if (err) {
                    reject(err);
                }

                for (let file of files) {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    let plugin: PluginDataOptions = require(`..${file.slice(7)}`);

                    this.plugins.set(plugin.name, plugin);
                    
                    for (let command of plugin.commands) {
                        command.names.forEach(name => {
                            this.set(name, command);
                        });
                    }
                }
            });

            resolve(true);
        });
    }
}