import Eris from "eris";
import UtilityManager from "../src/UtilityManager";
import { Plugins } from "../start";
import ZeraBuilder from "./ZeraBuilder";

export class CommandContextBuilder {
    private data: CommandContextBuilderOptions;

    private util: UtilityManager;

    public constructor(data: CommandContextBuilderOptions) {
        this.data = data;
        this.util = new UtilityManager(this);
    }

    get message() {
        return this.data.message;
    }

    get args() {
        return this.data.args;
    }

    get client() {
        return this.data.client;
    }

    get channel() {
        return this.message.channel;
    }
    
    public respond(content: Eris.MessageContent) {
        return this.util.respond(content);
    }

    get shard() {
        return this.guild.shard;
    }

    get guild() {
        return (<Eris.GuildChannel>this.channel).guild;
    }

    get zera() {
        return this.data.client;
    }

    get commands() {
        return this.client.commands;
    }

    get clientPlugins() {
        return this.client.plugins;
    }

    get plugins() {
        return this.commands.plugins;
    }
}

export interface CommandContextBuilderOptions {
    message: Eris.Message;
    args: string[];
    client: ZeraBuilder<Plugins>;
}