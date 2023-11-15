import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

export default function Header({
  gastos,
  presupuesto, 
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  setGastos}) {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        {isValidPresupuesto ? (
          <ControlPresupuesto gastos={gastos} setGastos={setGastos} presupuesto={presupuesto} setPresupuesto={setPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto} />)
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
