import { open } from 'sqlite';
import sqlite3 from 'sqlite3'

sqlite3.verbose();
export async function openDB() {
    return open({
        filename: './sqlite.db',
        driver: sqlite3.Database
    });
}
