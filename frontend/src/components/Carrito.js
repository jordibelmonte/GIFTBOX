
import { BsDash, BsFillPeopleFill, BsPlus, BsTrash} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import carritoActions from "../redux/actions/carritoActions";
import {Link} from "react-router-dom"

const Carrito=({carrito,eliminarDelCarrito,actualizarCarrito,total})=>{
    if(!carrito){return <h1>loading..</h1> }
    return(
        <>
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("../assets/carritoImagen.png")` }} >
                <Link to="/">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <h3 style={{fontSize:"2.2rem", color:"#464646",paddingLeft:"1.5vw"}}>Tu carrito</h3>
                
            </div>
            <div className="carritoSection">
            {carrito.length!==0
            ?
                <div className="carritoPaquetes">
                    {carrito && carrito.map(paquete=>
                        <div className="carritoPaquete" key={`carritoPaquete${paquete._id}`}>
                            <div className="carritoPaqueteNombre" style={{ backgroundImage: `url("../assets/bannerCarrito.jpg")` }} >
                                {paquete.nombre}
                                <BsTrash onClick={()=>eliminarDelCarrito(paquete)} style={{cursor:"pointer"}}/>
                            </div>
                            <div className="carritoPaqueteContenido">
                                <div id="carritoImagen">
                                    <div className="carritoImagen" style={{backgroundImage: `url(${paquete.imagen})`}}></div>
                                </div>
                                <div id="carritoDescripcion">
                                    <div>
                                        <h4 style={{textShadow:"2px"}}> <BsFillPeopleFill/> Para {paquete.cantidadPersonas} personas o mas</h4>
                                        <p>Stock: {paquete.stock}</p>
                                    </div>
                                    <div>
                                        <h3>${paquete.precio}</h3>
                                    </div>
                                </div>
                                <div id="carritoCantidad">
                                    <div id="carritoCantidad1" >
                                        {paquete.cantidad===1 
                                        ? <button style={{cursor:"not-allowed",backgroundColor:"rgb(169 161 161 / 58%)"}} className="buttonCarrito"><BsDash/></button>
                                        : <button value={-1} onClick={(e)=>actualizarCarrito(paquete,e.target.value)} className="buttonCarrito"><BsDash/></button>}
                                        <div ><h5 >x{paquete.cantidad}</h5></div>
                                        {paquete.stock===0
                                        ?<button style={{cursor:"not-allowed",backgroundColor:"#eaeaea"}}  className="buttonCarrito"><BsPlus/></button>
                                        :<button value={1} onClick={(e)=>actualizarCarrito(paquete,e.target.value)} className="buttonCarrito"><BsPlus/></button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            :
            <div className="carritoPaquetes" style={{paddingTop:"10vh",fontSize:"1.4rem"}}>
                <h2>Tu carrito está vacío</h2>
                <h5>¿No sabés qué comprar? ¡Miles de paquetes te esperan!</h5>
            </div>
            }
                <div className="carritoResumen">
                    <div>
                        <div id="resumenTitulo">
                            <h4>Resumen de compra</h4>
                        </div>
                        {carrito.map(paquete=>
                            <div id="resumenPaquetes" key={`resumenPaq${paquete._id}`}>
                                <div>
                                    <p>{paquete.nombre} x{paquete.cantidad}</p>
                                </div>
                                <p> $ {paquete.precio*paquete.cantidad} </p>
                            </div>
                        )}
                        <div id="resumenTotal" >
                            <p>Total</p>  
                            <p>$ {total}</p>
                        </div>
                        <div id="resumenContinuarYseguir">
                            <Link to="/envio" id="carritoContinuar">Continuar</Link>
                            <Link id="carritoSeguirComprando">Seguir Comprando</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
}
const mapStateToProps = state => {
    return {
        carrito: state.carritoReducer.carrito,
        total:state.carritoReducer.total
    }
}
const mapDispatchToProps = {
    agregarAlCarrito: carritoActions.agregarAlCarrito,
    eliminarDelCarrito: carritoActions.eliminarDelCarrito,
    actualizarCarrito: carritoActions.actualizarCarrito
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito)