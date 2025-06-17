import { open } from 'sqlite';
import sqlite3 from 'sqlite3'

sqlite3.verbose();
export async function openDB() {
    try {
    return open({
        filename: './sqlite.db',
        driver: sqlite3.Database
    });
    } catch (e) {
        console.log(e, 'error desde sqlite.js')
        return null
    }

}
