import fs from "fs";
import { red, green, yellow, blue, bold } from "chalk";

export class ConfigPlugin<T extends string> {
    private parse() {
        let text = fs.readFileSync("./config.txt", "utf8");
        let split = text.split("\n");

        let objectMap: {[key: string]: string} = {};

        for (let data of split) {
            let items = data.split(" > ");
            objectMap[items[0]] = items[1];
        }

        return objectMap;
    }

    public get(item: T) {
        let items = this.parse();
        return items[item];
    }
}

export class LoggerPlugin {
    public readonly date: string = new Date().toISOString();

    public info(content: LoggerOptions) {
        console.log(`${this.date} => ${blue(this.handle(content))}`);
    }

    public success(content: LoggerOptions) {
        console.log(`${this.date} => ${green(this.handle(content))}`);
    }

    public warn(content: LoggerOptions) {
        console.log(`${this.date} => ${yellow(this.handle(content))}`);
    }

    public error(content: LoggerOptions) {
        console.log(`${this.date} => ${red(this.handle(content))}`);
    }

    private handle(content: LoggerOptions) {
        if (typeof content === "string") {
            return content;
        } else {
            if (content.hasBold) {
                content.message = bold(content.message);
            }
            return content.message;
        }
    }
}

type LoggerOptions = string | LogOptions;

interface LogOptions {
    message: string;
    hasBold?: boolean;
}