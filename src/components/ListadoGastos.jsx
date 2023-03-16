import Gasto from "./Gasto"

export default function ListadoGastos({gastos,setGastoEditar,eliminarGasto,gastosFiltrados,filtro}) {
  return (
    <div className="listado-gastos contenedor">
        

        {
          filtro ?

          (
            <>
                <h2> {gastosFiltrados.length ? `Gastos de ${filtro}` : "No hay gastos en esta categoria"} </h2>
                {gastosFiltrados.map(gasto => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />))} 

            </>
            
          ) 
            
          :

          (  
            <>
                <h2> {gastos.length ? "Todos los gastos" : "No hay gastos aún"} </h2>
                {gastos.map(gasto => (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                    />
                    
                ) )} 
            </>
          )
        }
    </div>
  )
}
