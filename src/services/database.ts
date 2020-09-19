import * as pg from 'pg'

export function connectToDb(url: string) {
    const client = new pg.Client(url);
    client.connect().then(_ => console.log("Connected to the db")).catch(console.error)
    return client
}
