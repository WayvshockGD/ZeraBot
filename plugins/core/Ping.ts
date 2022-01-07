import ms from "ms";
import { createCommand } from "../CommandBuilder";

type Names = "ping" | "ms" | "wsping";

export = createCommand<Names>({
    names: ["ping", "ms", "wsping"],
    description: [],
    run(ctx) {
        ctx.respond("Pinging...").then((message) => {
            if (typeof message === "object") {
                setTimeout(() => {
                    message.edit(`Shard ping: \`${ctx.shard.latency}\`, seconds: ${ms(ctx.shard.latency)}`);
                }, ms("1s"));
            } else {
                ctx.respond("Had trouble while editing.");
            }
        });
    }
});