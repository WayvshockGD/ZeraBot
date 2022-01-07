import NortonBuilder from "../builders/NortonBuilder";
import fs from "fs";
import { Plugins } from "../start";

export = function(client: NortonBuilder<Plugins>) {
    client.plugins.logger.info("Logging guild data");

    let guildData = [];

    for (let [id, guild] of client.guilds.entries()) {
        guildData.push(`(ID >> ${id}) >>> [SHARD: ${guild.shard}][NAME: ${guild.name}]\n`);
    }

    fs.writeFileSync("./data/Guilds.log", guildData.join("\n"), "utf8");

    client.plugins.logger.info("Set guild data");
    client.plugins.logger.info(`Logged in as ${client.user.username}`);
}