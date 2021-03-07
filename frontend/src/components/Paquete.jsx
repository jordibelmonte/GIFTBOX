import '../styles/paquete.css'
import { connect } from 'react-redux'
import paqueteActions from '../redux/actions/paqueteActions'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { BsArrowLeft, BsFillPeopleFill, BsBuilding, BsGiftFill, BsIntersect, BsEnvelopeFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";



const Paquete = ({loggedUser, match, paquetePorId, obtenerPaquetePorId,obtenerValoracion,enviarValoracion }) => {
    const [paquete, setPaquete] = useState([])
    const [usuarioYvalidacion,setUsuarioYvalidacion]=useState({idUsuario:null,valor:null})
    const ratingChanged = (newRating) => {
        setUsuarioYvalidacion({idUsuario:loggedUser.id,valor: newRating})
        if(usuarioYvalidacion.idUsuario && usuarioYvalidacion.valor){
            enviarValoracion(id,usuarioYvalidacion)
            obtenerPaquetePorId(id)
        
        }
    };
    const id = match.params._id
    useEffect(() => {
        obtenerPaquetePorId(id)
        obtenerValoracion(paquete)
        paquetePorId && setPaquete(paquetePorId)
    }, [id,usuarioYvalidacion])
    console.log(paquete)

 
    return (
        <>
            {paquetePorId &&
                <>
                    <div className="paqueteBanner"><Link to="/" style={{ display: 'flex', alignItems: 'center' }}><BsArrowLeft className="paqueteIcono" />Regresar a la página principal</Link></div>
                    <div className="paqueteContainer">
                        <h2 className="tituloPaquete">{paquetePorId.nombre}</h2>
                        <p className="descripcionPaquete">{paquetePorId.descripcion}</p>
                        <div className="paqueteImgInfo">
                            <div className="paqueteImg" style={{
                                backgroundImage: `url(${paquetePorId.imagen})`
                            }}>
                            </div>
                            <div className="paqueteInfo">
                                <h4>Acerca de esta GiftBox</h4>
                                <div className="cantidadDePersonas"><BsFillPeopleFill className="icon" /> Para <span>{paquetePorId.cantidadPersonas}</span> persona/s</div>
                                <div className="categoria"><BsIntersect className="icon" /> Categoria: <span>{paquetePorId.categoria}</span></div>
                                <div className="ubicacion"><BsBuilding className="icon" /> Ubicacion: <span>{paquetePorId.ubicacion}</span></div>
                                <div className="vendidos"><BsGiftFill className="icon" /> Cantidad de paquetes vendidos: <span>{paquetePorId.cantidadVendidos.length}</span></div>
                                <div className="linea"></div>
                                <div className="formatodeRegalo">
                                    <h5>Formatos de Regalo:</h5>
                                    <p className="regaloDigital">Regalo digital</p>
                                    <p className="envioPorEmail">Envío por email</p>
                                </div>
                                <div className="linea"></div>
                                <div className="precio">$ {paquetePorId.precio}
                                    <a href="https://www.mercadopago.com.ar/ayuda/medios-de-pago-cuotas-promociones_264" target="blank">ver cuotas</a>
                                </div>
                                <button className="comprarPaquete">Comprar esta GiftBox</button>
                                <div className="mediosdepago"></div>
                            </div>
                        </div>
                    </div>
                    <div className="valoracionContainer">    
                        <div className="valoracion">
                            <span>{(paquetePorId.promedio).toFixed(2)}</span>
                            <ReactStars count={5} value={paquetePorId.prom} onChange={ratingChanged} 
                            size={50} activeColor="#ffd700" isHalf={true}/>
                        </div>
                        <img src="https://fotos.subefotos.com/af333790da6d3696dec1241bd0c55308o.png" alt="estrellas" />
                    </div>
                    <div className="productosContainer">
                        <div className="encabezado">
                            <h3>Dentro del paquete: </h3>
                            <p>Tu agasajado va a poder disfrutar de estos "cantidad de productos" productos</p>
                        </div>
                    </div>
                </>
            }
        </>
    )

}

const mapStateToProps = state => {
    return {
        todosLosPaquetes: state.paqueteReducer.todosLosPaquetes,
        paquetePorId: state.paqueteReducer.paquetePorId,
        loggedUser: state.userReducer.loggedUser
    }
}

const mapDispatchToProps = {
    obtenerTodosLosPaquetes: paqueteActions.obtenerTodosLosPaquetes,
    obtenerPaquetePorId: paqueteActions.obtenerPaquetePorId,
    obtenerValoracion: paqueteActions.obtenerValoracion,
    enviarValoracion: paqueteActions.enviarValoracion
}

export default connect(mapStateToProps, mapDispatchToProps)(Paquete)