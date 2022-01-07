import { CommandDataOptions, PluginDataOptions } from "../types/CommandTypes";

export function createPlugin(options: PluginDataOptions) {
    return options;
}

export function createCommand<T>(options: CommandDataOptions<T>) {
    return options;
}