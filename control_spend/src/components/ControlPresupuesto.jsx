import { useState } from "react"

export default function ControlPresupuesto({presupuesto}) {
    
    const formatearCantidad =(val)=>{
        return val.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            grafica aqui
        </div>
        <div className="contenido-presupuesto">
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span>{formatearCantidad(0)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(0)}
            </p>
        </div>

    </div>
  )
}
