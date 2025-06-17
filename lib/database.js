import { openDB } from "./sqlite";

export async function createDataBase() {
    const db = await openDB();

    await db.exec(`CREATE TABLE IF NOT EXISTS funerarias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        ranking INTEGER,
        clientesMensuales INTEGER,
        metodos_usados TEXT
        )`
    );

}


