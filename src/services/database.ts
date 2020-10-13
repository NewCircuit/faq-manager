import * as pg from 'pg'
import { Config } from './config';

export function connectToDb(config: Config) {
    const client = new pg.Client({
        user: config.database.user,
        host: config.database.host,
        database: config.database.database,
        password: config.database.password,
        port: config.database.port
    });
    client.connect().then(_ => console.log("Connected to the db")).catch(console.error)
    return client
}
