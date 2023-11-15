import { useState, useEffect } from 'react'
import Header from './components/Header'
import NuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import {generarId} from './helpers' 
import ListadoGastos from './components/ListadoGastos'
import Filtro from './components/Filtro'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")):[])
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  

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
    localStorage.setItem("gastos",JSON.stringify(gastos) ?? 0)
  }, [gastos])
  
  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0
    const gastosLs = JSON.parse(localStorage.getItem('gastos')) ?? []
    if (presupuestoLs > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    if(filtro){
      const filtroGasto = gastos.filter(gastoFiltrado => gastoFiltrado.categoria === filtro)
      setGastosFiltrados([...filtroGasto])

    }
  }, [filtro])
  
  
  
  
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
        setGastos={setGastos}
      />
      {isValidPresupuesto &&
      (
        <>
          <main>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastos={gastos}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              setFiltro={filtro}
              />
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
