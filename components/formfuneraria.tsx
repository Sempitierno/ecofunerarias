'use client'

import { useState } from "react"
import { Datasave } from "@/lib/datasave"

export default function Form() {
    const [nombre,setNombre] = useState("")
    const [ranking, setRanking] = useState("")
    const [compras, setCompras] = useState("")

    async function ManejarSubida(){
        console.log(nombre, ranking, compras)
        try {

        await Datasave(nombre, ranking, compras)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="flex flex-col">
            <div>
                <label>Nombre</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} className="bg-gray-200" />
            </div>
            <div>
                <label>Ranking</label>
                <input value={ranking} onChange={e => setRanking(e.target.value)} className="bg-gray-200" />
            </div>
            <div>
                <label>Compras Mensuales</label>
                <input value ={compras} onChange={e => setCompras(e.target.value)} className="bg-gray-200" />
            </div>

             {nombre}
            <button onClick={ManejarSubida} className="bg-red-500 text-white p-3"> Agregar</button>
        </div>
    )
}

