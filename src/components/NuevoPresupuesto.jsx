import { useState } from "react"
import Mensaje from "./Mensaje";

export default function NuevoPresupuesto({presupuesto,setPresupuesto,setIsValidPresupuesto}) {

  const [mensaje,setMensaje] = useState('');

  const handlePresupuesto=(e)=>{
    e.preventDefault()

    //Con Number() convertimos a INT para segurarnos que no ponen letras o numeros negativos. SI tornamos el input a number nos ahorramos la funcion Number()
    if(!Number(presupuesto) || Number(presupuesto)<0){
      setMensaje('No es un Presupuesto Válido')
      
    }else{
      setMensaje('')
      setIsValidPresupuesto(true)
    }

  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
     
        <form onSubmit={handlePresupuesto} className="formulario">
          <div className="campo">
            <label htmlFor="">Definir Presupuesto</label>

            <input className='nuevo-presupuesto' type="text" placeholder='Añade tu presupuesto' value={presupuesto} onChange={e=>setPresupuesto(Number(e.target.value)) } />
          </div>

          <input type="submit" value="Añadir" />
          {mensaje && <Mensaje tipo="error"> {mensaje} </Mensaje>}
        </form>
    </div>
  )
}
