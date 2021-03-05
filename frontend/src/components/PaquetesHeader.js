import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import paqueteActions from '../redux/actions/paqueteActions'
import Loader from './Loader'
import { Link } from "react-router-dom"
import productoActions from "../redux/actions/productoActions"
import categoriaActions from '../redux/actions/categoriaActions'
import { MdKeyboardArrowDown } from 'react-icons/md'

const PaquetesHeader = ({ todosLosPaquetes, paquetesPorCategoria, obtenerTodosLosPaquetes, productosDelpaquete,
  obtenerPaquetesPorCategoria, obtenerTodoslosProductos, todosLosProductos, obtenerProductosPorPaquete, todasLasCategorias, obtenerTodasLasCategorias }) => {

  const [mostrarProductos, setMostrarProductos] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!todosLosPaquetes) {
      obtenerTodosLosPaquetes()
      obtenerTodoslosProductos()
      obtenerTodasLasCategorias()
    }
  }, [])


  // COMO USAR CARGANDO PARA MOSTRAR PRELOADER
  if (!todosLosPaquetes || !todosLosProductos) { return <Loader /> }

  return (
    <div className='contenedorPaquetes'>

      <h1 className="headerTituloPaquetes" onClick={() => setVisible(!visible)}>Paquetes<MdKeyboardArrowDown /></h1>
      <div className="flexRowPaquetes">
      <div className="paquetes">
      {(visible && todasLasCategorias) && todasLasCategorias.map(categoria => {
        return (
          <button className="paquetesPadres" onMouseEnter={() => obtenerPaquetesPorCategoria(categoria.nombre)} key={`btnCat${categoria._id}`}>{categoria.nombre}</button>
          
        )
      })}
      </div>
        <div className="linksPaquetesPadre" onMouseOver={() => setMostrarProductos(true)}    onMouseOut={() => setMostrarProductos(false)}>
          {visible && paquetesPorCategoria.map(paquete => 
            <>
            <Link  exact to={`/paquete/${paquete._id}`} key={`Link${paquete._id}`}>
              <p className="linksPaquetes" onMouseOver={() => obtenerProductosPorPaquete(paquete._id)}>
              {paquete.nombre}
            </p>
            </Link>
            </>
        )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todosLosPaquetes: state.paqueteReducer.todosLosPaquetes,
    paquetesPorCategoria: state.paqueteReducer.paquetesPorCategoria,
    todosLosProductos: state.productoReducer.todosLosProductos,
    productosDelpaquete: state.productoReducer.productosDelpaquete,
    todasLasCategorias: state.categoriaReducer.todasLasCategorias
  }
}

const mapDispatchToProps = {
  obtenerTodosLosPaquetes: paqueteActions.obtenerTodosLosPaquetes,
  obtenerPaquetesPorCategoria: paqueteActions.obtenerPaquetesPorCategoria,
  obtenerTodoslosProductos: productoActions.obtenerTodoslosProductos,
  obtenerProductosPorPaquete: productoActions.obtenerProductosPorPaquete,
  obtenerTodasLasCategorias: categoriaActions.obtenerTodasLasCategorias
}

export default connect(mapStateToProps, mapDispatchToProps)(PaquetesHeader)