export async function FormFuneraria(nombre,ranking, clientemensuales) {

    return(

        <div>
            
            <h1> Nombre </h1>
            <input value={nombre}/>
        <div>
            <input value={ranking}/>
        <div>
            <input value={clientemensuales}/>
        </div>        
        </div>
        </div>
    )
}

export default FormFuneraria;