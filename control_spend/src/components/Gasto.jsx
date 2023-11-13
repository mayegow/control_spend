import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from '../helpers'
import Casa from '../img/icono_casa.svg'
import Suscripciones from '../img/icono_suscripciones.svg'
import Comida from '../img/icono_comida.svg'
import Ocio from '../img/icono_ocio.svg'
import Salud from '../img/icono_salud.svg'
import Ahorro from '../img/icono_ahorro.svg'
import Gastos from '../img/icono_gastos.svg'

export default function Gasto({gasto}) {

    const diccionarioIconos = {
        "ahorro": Ahorro,
        "casa": Casa,
        "comida": Comida,
        "ocio": Ocio,
        "gastos": Gastos,
        "salud": Salud,
        "suscripciones": Suscripciones,
    }
    const {nombre, cantidad, categoria, id, fecha} = gasto
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={()=> console.log("Editar")}>
                Editar
            </SwipeAction>
        </LeadingActions>
        )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={()=> console.log("Eliminar")}>
                Eliminar
            </SwipeAction>
        </TrailingActions>

    )
  return (
    <SwipeableList>
        <SwipeableListItem 
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className="gasto sombra">
                <div className="contenido-imagen">
                    <img src={diccionarioIconos[categoria]} width="150" height="150" alt={categoria} />

                </div>
                <div className="contenido-gasto">
                    <div className="descripcion-gasto">
                        <p className="categoria"> {categoria}</p>
                        <p className="nombre-gasto">{nombre}</p>
                        <p className="fecha-gasto"> Agregado el:{''} <span>{formatearFecha(fecha)}</span> </p>
                    </div>
                </div>
                <p className="cantidad-gasto"> ${cantidad}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}
