import ms from "ms";
import { createCommand } from "../CommandBuilder";

export = createCommand({
    names: ["ping", "ms", "wsping"],
    description: [],
    run(ctx) {
        let now = Date.now();

        ctx.respond("Pinging...").then((message) => {
            if (typeof message === "object") {
                try {
                    setTimeout(() => {
                        let ts = typeof message.editedTimestamp === "undefined" ? 0 : message.editedTimestamp;
                        let diff = (Date.now() - now) - ts;
                        message.edit(`Shard ping: \`${diff}\`, seconds: ${ms(diff)}`);
                    }, ms("60ms"));
                } catch (err) {
                    let error: Error = err as Error;
                    ctx.respond(`Unable to edit message \`${error.message}\``);
                }
            } else {
                ctx.respond("Had trouble while editing.");
            }
        });
    }
});