import fs from "fs";
import * as yaml from "js-yaml";

interface Config {
    database_url: string
    channel_id: string
    token: string
}

export function loadConfig(): Config {
    let fileContents = fs.readFileSync('./config.yml', 'utf-8');
    return <Config>yaml.safeLoad(fileContents);
}
