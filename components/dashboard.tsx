'use client'

import { useState } from "react"

export default function Dashboard({data}: any){
    const [funeraria, setFuneraria] = useState(data)
    
    return(
        <div>
            {funeraria.map(item => (
                <div>
                    <h1> Nombre Funerarias </h1> 
                    <p className="bg-green-200">
                    {item.nombre} 
                    </p>
                    <h1> Ranking Funerarias 1-10</h1>
                    <p className="bg-red-400">
                    {item.ranking}
                    </p>
                    <h1> Clientes Mensuales </h1>
                    <p className="bg-blue-400">
                    {item.clientesMensuales}
                    </p>
                </div>
            ))}   
        </div>
    )
}