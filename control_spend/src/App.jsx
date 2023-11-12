import { useState } from 'react'
import Header from './components/Header'
import NuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import {generarId} from './helpers' 

function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const guardarGasto = (gasto) => {
    gasto.id = generarId()
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
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto &&
       (<div className="nuevo-gasto">
          <img 
          src={NuevoGasto}
          alt="icono nuevo gasto"
          onClick={handleNuevoGasto}
          />
        </div>)
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
