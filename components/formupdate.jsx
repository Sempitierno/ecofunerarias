'use client'

import { DataDelete, DataUpdate } from "@/lib/datasave"
import { Target } from "lucide-react"
import { useState } from "react"

export default function FormUpdate({data}){
    const [nombre, setNombre] = useState (data.nombre)
    const [ranking, setRanking] = useState (data.ranking)
    const [clientesMensuales, setClientesMensuales] = useState (data.clientesMensuales)
    async function ManejarBorrado() {
        await DataDelete(data.id)
        window.location.replace ("/dashboard")
        
    }
    async function ManejarSubida(){
         await DataUpdate(data.id, nombre, ranking, clientesMensuales)
        window.location.replace ("/dashboard")
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
                <label>Clientes Mensuales</label>
                <input value ={clientesMensuales} onChange={e => setClientesMensuales(e.target.value)} className="bg-gray-200" />
            </div>

             {nombre}
            <button onClick={ManejarSubida} className="bg-red-500 text-white p-3"> Actualizar</button>
            <button onClick={ManejarBorrado} > Borrar</button>
        </div>
    )
}
