import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function ControlPresupuesto({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) {

    const [disponible,setDisponible]=useState(0)
    const [gastado,setGastado]=useState(0)

    //Porcentaje para la barra de progreso
    const [porcentaje, setPorcentaje] = useState(100)

    useEffect(()=>{
        //Calculamos el total gastado con el metodo reduce
        const totalGastado=gastos.reduce((total,gasto) => Number(gasto.cantidad) + total, 0)
        setGastado(totalGastado)

        //Calculamos el presupuesto disponible
        const totalDisponible=presupuesto-totalGastado
        setDisponible(totalDisponible)
       
        //Calcular porcentaje gastado(totalGastado*100)/presupuesto
        const nuevoPorcentaje=(((presupuesto-totalDisponible) / presupuesto ) * 100).toFixed(2) //toFixed le indicamos cuantos decimales devolvera la operacion

        
        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        },1000)

    },[gastos])

    const formatearCantidad=(cantidad)=>{
        return cantidad.toLocaleString('es-ES',{
            style:'currency',
            currency:'EUR'
        })
    }

    //Resetear la aplicacion
    const handleResetApp=()=>{
        const resultado=confirm('¿Deseas reiniciar presupuesto y gastos?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

        {/* Grafica con circular-progress-bar */}
        <div>  

        <CircularProgressbar
            styles={buildStyles({
                pathColor: porcentaje > 100 ? 'red' :'#3b82f6',
                trailColor: porcentaje > 100 ? 'red' : '#f5f5f5',
                textColor: porcentaje > 100 ? 'red' : '#3b82f6'
            })}
            value={porcentaje}
            text={`${porcentaje} % Gastado`}
        />

        </div>

        <div className="contenido-presupuesto">

            <button className='reset-app' type="button" onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto:  </span>{formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`} >
                <span>Disponible:  </span>{formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado:  </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}
