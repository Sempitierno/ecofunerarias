'use server'

import { openDB } from "./sqlite"

export async function Datasave(nombre, ranking, compras) {
    const db = await openDB()
    console.log(nombre, ranking, compras)
    await db.run(`Insert into funerarias (nombre, ranking, clientesMensuales) values (?,?,?)`,
        nombre, ranking, compras 
    )
    console.log("Guardado con éxito")
}