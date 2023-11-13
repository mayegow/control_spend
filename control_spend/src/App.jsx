import { useState } from 'react'
import Header from './components/Header'
import NuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import {generarId} from './helpers' 
import ListadoGastos from './components/ListadoGastos'

function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const guardarGasto = (gasto) => {
    gasto.id = generarId()
    gasto.fecha = new Date()
    setGastos([...gastos,gasto])
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300);
  }

  const handleNuevoGasto =() => {
    setModal(true)
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
            <ListadoGastos gastos={gastos}/>
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
        />
       }
      
    </>
  )
}

export default App
