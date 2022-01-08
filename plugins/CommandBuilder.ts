import {CommandDataOptions, PluginDataOptions} from "../types/CommandTypes";

export function createPlugin(options: PluginDataOptions) {
    if (!options.canBeTurnedOff) options.canBeTurnedOff = true;
    return options;
}

export function createCommand(options: CommandDataOptions) {
    if (typeof options.enabled === "undefined") options.enabled = true;
    return options;
}