import { useState , useEffect } from "react"
import { generarId } from "../helpers";

import CerrarBtn from "../img/cerrar.svg"
import Mensaje from "./Mensaje";

export default function Modal({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    const [mensaje,setMensaje]=useState('');

    //useEffect que se ejecutara cuando el componente se cargue
    useEffect(()=>{
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])

    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(()=>{
            setModal(false)
        },500)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        //Si algun campo esta vacio('')
        if([nombre,cantidad,categoria].includes('')){
            setMensaje('Todos los campo son obligatorios')

            setTimeout(()=>{
                setMensaje('')
            },3000)
        }else{

            guardarGasto({nombre,cantidad,categoria,fecha,id})
        }
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarBtn} alt="Boton Cerrar" onClick={ocultarModal}/>
        </div>

        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

            {mensaje && <Mensaje tipo="error" > {mensaje} </Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input id="nombre" type="text" placeholder="Añade el gasto" value={nombre} onChange={e=>setNombre(e.target.value)} />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input id="cantidad" type="number" placeholder="Añade la cantidad del gasto" value={cantidad} onChange={e=>setCantidad(e.target.value)} />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>

                <select id="categoria" value={categoria} onChange={e=>setCategoria(e.target.value)}>
                    <option value="">--Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
                
            </div>

            <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}  />
        </form>
    </div>
  )
}
