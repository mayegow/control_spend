import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ControlPresupuesto({gastos, presupuesto}) {
    const [disponible , setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [percentage, setPercentage] = useState(0)

    const formatearCantidad = val =>{
        return val.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }


    useEffect(() => {
        const totalGastado = Number(gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0))
        const totalDisponible = presupuesto - totalGastado
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(1)
        setTimeout(() => {
            setPercentage(nuevoPorcentaje)
        }, 500);
        
    }, [gastos])

    
    

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
            styles={buildStyles({
                pathColor: '#3B82F6',
                trailColor: '#eee',
                pathTransitionDuration: 2
            })}
            value={percentage} 
            text={`${percentage}% Gastado`}/>
        </div>
        <div className="contenido-presupuesto">
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>

    </div>
  )
}
