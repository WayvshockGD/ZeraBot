import { CommandContextBuilder } from "../builders/CommandContextBuilder";

export interface PluginDataOptions {
    name: string;
    description: string;
    enabled: boolean;
    canBeTurnedOff?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    commands: CommandDataOptions[];
}

export interface CommandDataOptions {
    names: string[];
    description: string[];
    enabled?: boolean;
    run(ctx: CommandContextBuilder): void;
}