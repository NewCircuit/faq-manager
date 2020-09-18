import * as pg from 'pg'

export function connect_to_db(url: string) {
    const client = new pg.Client(url);
    client.connect().then(_ => console.log("Connected to the db")).catch(console.error)
    return client
}
