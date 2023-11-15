import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'
import {useState, useEffect} from 'react'

export default function Modal({
    setModal, 
    animarModal, 
    setAnimarModal,
    guardarGasto,
    gastoEditar, 
    setGastoEditar
    }) {
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState("") 
    const [fecha, setFecha] = useState("")

    const ocultarModal = () => {
        setGastoEditar({})
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
    }
    const handleSubmit = e =>{
        e.preventDefault()
        
        if ([nombre, cantidad, categoria].includes('')){
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setMensaje('')
            }, 2000);
            return
        }
        guardarGasto({nombre, cantidad, categoria, fecha, id})
    }

    useEffect(()=>{
        if (Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
            src={CerrarBtn}
            alt="cerrar modal"
            onClick={ocultarModal}
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
            <legend>{Object.keys(gastoEditar).length > 0 ? "Editar Gasto" : "Nuevo gasto" }</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre Gasto"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id="cantidad"
                    type="number"
                    placeholder="Cantidad del gasto. ej: $300"
                    value={cantidad}
                    onChange={ e => setCantidad(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select id="categoria" value={categoria} onChange={ e => setCategoria(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <div className="campo">
                <input 
                    type="submit"
                    value={Object.keys(gastoEditar).length > 0 ? "Guardar cambios" : "Agregar gasto" }
                />
            </div>
        </form>

    </div>
  )
}
