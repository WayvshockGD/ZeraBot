import Eris from "eris";
import { Knex } from "knex";
import { CommandContextBuilder } from "../builders/CommandContextBuilder";
import ZeraBuilder from "../builders/ZeraBuilder";
import { Plugins } from "../start";
import { CommandDataOptions } from "../types/CommandTypes";

export = async function(client: ZeraBuilder<Plugins>, message: Eris.Message, db: Knex) {
    let prefix: string;

    let prefixData = (await db.table<{ guild: string, setting: string }>("prefix"));

    let guild = (<Eris.GuildChannel>message.channel).guild;

    if (!guild) {
        return
    }

    let data = prefixData.find((d) => d.guild === guild.id);

    if (data) {
        prefix = data.setting;
    } else {
        prefix = client.plugins.config.get("prefix");
    }

    if (!message.content.startsWith(prefix)) {
        return;
    }

    let commandArgs = message.content.slice(prefix.length).trim().split(" ");
    let command = client.commands.get(commandArgs[0]);

    if (!verifyCommand(command)) {
        return;
    }

    let args = commandArgs.slice(1);

    command?.run(new CommandContextBuilder({ args, client, message }));
}

function verifyCommand(command?: CommandDataOptions) {
    if (typeof command === "undefined") return false;
    return command;
}