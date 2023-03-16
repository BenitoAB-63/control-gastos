import Header from "./components/Header"
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";
import { useState, useEffect } from "react"
//No hace falta indicar el archivo ya que es index.js
import {generarId} from "./helpers"
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  //EL valor de presupuesto sera el que haya en localStorage, si no hay nada entonces sera 0 
  const [presupuesto,setPresupuesto]=useState( Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto]=useState(false);

  const [modal,setModal]=useState(false);
  const [animarModal,setAnimarModal]=useState(false);

  const [gastos, setGastos] = useState( localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')

  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //UseEffect para el filtro
  useEffect(()=>{
    if(filtro){
      //Filtrar los gastos
      const gastosFiltrados = gastos.filter(gasto=> gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  //useEffect para almacenar el presupuesto en localStorage
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  //Comprobamos cada vez que carguemos la App si el presupuesto es valido
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  },[])

  //useEffect para los gastos
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])


  //useEffect para activar handleNuevoGasto a los cambios de gastoEditar
  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
        //Mostramos el modal
      setModal(true)

      setTimeout(()=>{
          setAnimarModal(true)
      },500)
    }
  },[gastoEditar])


  const handleNuevoGasto = () => {
    //Mostramos el modal
    setModal(true)
    //Vaciamos el gastoEditar
    setGastoEditar({})
    setTimeout(()=>{
        setAnimarModal(true)
    },500)
  }

  const guardarGasto = gasto => {

    //Si el gasto ya lleva id es que lo estamos actualizando
    if(gasto.id){
      //Actualizamos el arreglo de gastos. Si el id del gasto coincide con el del gasto que estamos actualizando , entonces actualizamos el gasto pertinente.
      const gastosActualizados=gastos.map(gastoState=>gastoState.id===gasto.id ? gasto : gastoState)
      
      setGastos(gastosActualizados)
      setGastoEditar({})
     
    }else{
      //Si estamos creando el gasto le pasamos el id, la fecha y los guardamos
      
      gasto.id = generarId()
      gasto.fecha = Date.now()

      setGastos([...gastos,gasto])
    }


    setAnimarModal(true)
    setTimeout(()=>{
        
        setModal(false)
    },500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto=>gasto.id!==id)

    setGastos(gastosActualizados)
  }

  return (
    <div className={modal && 'fijar'}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>

            <main>
              <Filtros
                  filtro={filtro}
                  setFiltro={setFiltro}
              />

              <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} gastosFiltrados={gastosFiltrados} filtro={filtro} />
            </main>

            <div className="nuevo-gasto">
              <img src={IconoNuevoGasto} alt="Nuevo Gasto" onClick={handleNuevoGasto} />
            </div>
        </>
      ) }

      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar} />}


    </div>
  )
}

export default App
