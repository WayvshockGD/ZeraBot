import Eris from "eris";
import { CommandContextBuilder } from "../builders/CommandContextBuilder";

export = class UtilityManager {
    private builder: CommandContextBuilder;

    public constructor(data: CommandContextBuilder) {
        this.builder = data;
    }

    public async respond(content: Eris.MessageContent) {
        return await this.builder.channel.createMessage(content).catch((err) => {
            this.logger.error({
                message: err,
                hasBold: true
            });
        });
    }

    get logger() {
        return this.builder.client.plugins.logger;
    }
}