import { useState, useEffect } from 'react'
import Header from './components/Header'
import NuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import {generarId} from './helpers' 
import ListadoGastos from './components/ListadoGastos'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])
  const [gastoEditar, setGastoEditar] = useState({})
  

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0 ){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 300);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem("presupuesto",presupuesto ?? 0)
    
  }, [presupuesto])
  
  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLs > 0){
      setIsValidPresupuesto(true)
      
    }
  }, [])
  
  
  
  const eliminarGasto = gasto => {
    const eliminarGasto = gastos.filter(eliminar => eliminar.id !== gasto.id)
    setGastos(eliminarGasto)
  }

  const guardarGasto = (gasto) => {
    console.log(gasto.fecha, "id")
    if (gasto.id && gasto.fecha){
      console.log("actualizando")
      const gastosActualizado = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos([...gastosActualizado])
      
    } else {
      console.log("agregando")
      gasto.id = generarId()
      gasto.fecha = new Date()
      setGastos([...gastos,gasto])
      
    } 
    setGastoEditar({})
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300);
  }

  const handleNuevoGasto =() => {
    setModal(true)
    setGastoEditar({})
    setTimeout(()=> {
      setAnimarModal(true)
    }, 300)
  }

  return (
    <>
      <Header
      gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto &&
      (
        <>
          <main>
            <ListadoGastos 
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            gastos={gastos}/>
          </main>
          <div className="nuevo-gasto">
            <img 
            src={NuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
            />
          </div>
        </>

      )
       }
       {modal && 
        <Modal 
          modal={modal}
          setModal={setModal} 
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          setGastoEditar={setGastoEditar}
          gastoEditar={gastoEditar}
        />
       }
      
    </>
  )
}

export default App
