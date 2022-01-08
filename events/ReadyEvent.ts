import ZeraBuilder from "../builders/ZeraBuilder";
import fs from "fs";
import { Plugins } from "../start";
import { Knex } from "knex";

export = async function(client: ZeraBuilder<Plugins>, db: Knex) {
    client.plugins.logger.info("Logging guild data");

    let guildData = [];

    for (let [id, guild] of client.guilds.entries()) {
        guildData.push(`(ID >> ${id}) >>> [SHARD: ${guild.shard}][NAME: ${guild.name}]\n`);
    }

    fs.writeFileSync("./data/Guilds.log", guildData.join("\n"), "utf8");

    client.plugins.logger.info("Set guild data");
    await loadDatabaseTables(db, client);
    client.plugins.logger.info(`Logged in as ${client.user.username}`);
}

async function loadDatabaseTables(db: Knex, client: ZeraBuilder<Plugins>) {
    client.plugins.logger.info("Checking database tables");
    if (!(await db.schema.hasTable("prefix"))) {
        client.plugins.logger.info("Creating table db prefix");
        await db.schema.createTable("prefix", (t) => {
            t.string("guild").notNullable();
            t.string("setting").notNullable();
        });
    }
    client.plugins.logger.info("done");
}