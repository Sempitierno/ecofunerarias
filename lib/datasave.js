'use server'

import { openDB } from "./sqlite"



export async function DataUpdate(id, nombre, ranking, clientesMensuales) {
    const db = await openDB()
    console.log(nombre, ranking)
    await db.run (`update funerarias set nombre = ?, ranking = ?, clientesMensuales= ? where id = ?`, 
        [nombre, ranking, clientesMensuales, id] )
    console.log("Actualizado con éxito")
}   

export async function DataDelete(id) {
    const db = await openDB()
    await db.run (`delete from funerarias where id =?`, [id])
    console.log("Borrado con éxito")
    
}

export async function Datasave(nombre, ranking, clientesMensuales ) {
    console.log(nombre, ranking, clientesMensuales)
    const db = await openDB()
    console.log(nombre, ranking, clientesMensuales)
    await db.run(`Insert into funerarias (nombre, ranking, clientesMensuales) values (?, ?, ?)`,
        [nombre, ranking, clientesMensuales]
    )
    console.log("Guardado con éxito")
}