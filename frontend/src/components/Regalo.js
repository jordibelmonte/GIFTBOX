
import { useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import regaloActions from "../redux/actions/regaloActions";
import Swal from 'sweetalert2'

const Regalo=({loggedUser,obtenerRegalo})=>{
    const codigo=useRef(null)
    const [regalo,setRegalo]=useState(null)
    const enviarCodigo=async ()=>{
        Swal.fire({
            title: 'Custom width, padding, background.',
            width: 600,
            padding: '3em',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })
        const respuesta= await obtenerRegalo(codigo.current.value)
        if(respuesta){
            setRegalo(respuesta)
        }
    }
    console.log(regalo)
    return(
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("../assets/carritoImagen.png")` }} >
                <Link to="/">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <h3 style={{fontSize:"2.2rem", color:"#464646",paddingLeft:"1.5vw"}}>Tu regalo</h3>
                
            </div>
            <div>

            {!regalo?
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column",padding:"10vh 20vw"}}>
                <input type="text" className="tipoEnvio" placeholder=" ingresa tu codigo" ref={codigo}
                    style={{height:"8vh",marginTop:"2vh",cursor:"text"}}/>
                <button onClick={()=>enviarCodigo()} >Enviar</button>
            </div>
            :
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column",padding:"10vh 20vw"}}>
                {regalo.paquetesId.map(regalo=>
                <div>
                    <div style={{backgroundImage:`url("${regalo.paqueteId.imagen}")`,width:"20vw",height:"20vh",backgroundSize:"cover"}}></div>
                    <h3>{regalo.paqueteId.nombre}</h3>
                    <h3>{`cantidad: ${regalo.cantidad}`}</h3>
                    <button>ver detalles del paquete(falta poner link al id de este paquete)</button>
                </div> )}
            </div>

            }
            </div>
        </div>
            
    )
}
const mapStateToProps=(state)=>{
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
const mapDispatchToProps={
    obtenerRegalo:regaloActions.obtenerRegalo
}
export default connect(mapStateToProps,mapDispatchToProps)(Regalo);