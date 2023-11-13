import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

export default function Header({
  gastos,
  presupuesto, 
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto}) {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        {isValidPresupuesto ? (
          <ControlPresupuesto gastos={gastos} presupuesto={presupuesto}/>)
          :
          (<NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        />)
        }
        
    </header>
  )
}
