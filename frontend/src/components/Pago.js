import React, { useState,useEffect } from 'react';
import { BsCheck} from "react-icons/bs";
import { BiArrowBack, BiCreditCard } from "react-icons/bi";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import ProgressBar from "@ramonak/react-progress-bar";
import { AiOutlineCreditCard } from "react-icons/ai";
import { FaMoneyBillAlt, FaPaypal } from "react-icons/fa";
import regaloActions from "../redux/actions/regaloActions";
import TarjetaDeCredito from "./TarjetaDeCredito"
import  PayPal  from './PayPal';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import carritoActions from "../redux/actions/carritoActions"

const Envio=({carrito,total,enviarRegalo, eliminarDelCarrito})=>{

    const [checkout, setCheckout] = useState(false)
    const[tarjetaValida, setTarjetaValida]= useState(false)

    console.log(tarjetaValida)
    
    if(!carrito){return <h1>loading..</h1>}
    
    function botonComprar() {
        enviarRegalo()

        const MySwal = withReactContent(Swal)
        MySwal.fire({
        title: <p className="popup" style={{color:"black", fontSize:15}}>Su compra fue realizada con éxito! :D</p>,
        icon:'success',
        toast: true,
        timer:4000,
        timerProgressBar:true,
        showConfirmButton:false,
        width:500, 
        background: '#d8f6d3',
        iconColor: '#2fbc13'                                        
        })
        carrito.map(paquete => eliminarDelCarrito(paquete)) 
        window.location.href='/'
    }


    return(
        <>
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("../assets/carritoImagen.png")` }} >
                <Link to="/envioMensaje">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <div id="progresoCompra">
                    <ProgressBar completed={70} labelAlignment="outside" bgcolor="#2e93e5"/>
                    <div style={{display:"flex",justifyContent:"space-between",paddingTop:"1vh",paddingRight:"2vw"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}><p>Envio </p><BsCheck size="1.3rem" color="green"/></div>
                        <div style={{display:"flex",justifyContent:"space-between"}}><p>Mensaje </p><BsCheck size="1.3rem" color="green"/></div>
                        <p>Pago</p>
                        <p>Resumen</p>
                    </div>
                </div>
                
            </div>
            <div className="carritoSection">
            {carrito.length!==0
            &&
                <div className="carritoPaquetes">
                    <div><h3>¿Cómo lo querés pagar?</h3></div>
                    <div id="metodoDeEnvio">
                        <div className="metodoDeEnvio1">
                            <div className="tipoEnvio" >
                                <BiCreditCard/>
                                <p style={{paddingLeft:"1vw"}} >Tarjeta de crédito</p>
                            </div> 
                        </div>
                        <div className="metodoDeEnvio1">
                            <div className="tipoEnvio" >
                                <AiOutlineCreditCard/>
                                <p style={{paddingLeft:"1vw"}} >Tarjeta de débito</p>
                            </div>
                        </div>
                        <div className="metodoDeEnvio1">
                            <div className="tipoEnvio" >
                                <FaMoneyBillAlt/>
                                <p style={{paddingLeft:"1vw"}} >Transferencia o depósito</p>
                            </div>
                        </div>
                        <div className="metodoDeEnvio1">
                        <div className="tipoEnvio" >
                                <FaPaypal/>
                                <p style={{paddingLeft:"1vw"}} onClick={() => setCheckout(!checkout)}>PayPal</p>
                                {checkout && (
                                    <PayPal total={total} carrito={carrito} />
                                )}
                            </div>
                        </div>
                    </div>
                    <TarjetaDeCredito setTarjetaValida={setTarjetaValida}/>
                
                
                <div  style={{width:"100%", paddingTop:"2vh"}}>
                    <Link id="carritoContinuar" style={{margin:"0"}} onClick={botonComprar}>
                        Comprar
                    </Link>
                </div>

            </div>
            
            }
                <div className="carritoResumen">
                    <div>
                        <div id="resumenTitulo">
                            <h4>Resumen de compra</h4>
                        </div>
                        {carrito.map(paquete=>
                            <div id="resumenPaquetes">
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
        total:state.carritoReducer.total,
        regalo:state.regaloReducer.regalo
    }
}
const mapDispatchToProps={
    enviarRegalo:regaloActions.enviarRegalo,
    eliminarDelCarrito: carritoActions.eliminarDelCarrito,
    modificarRegalo:regaloActions.modificarRegalo
}


export default connect(mapStateToProps, mapDispatchToProps)(Envio)