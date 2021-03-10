
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import {Link} from "react-router-dom"

const Regalo=({loggedUser})=>{
    return(
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("../assets/carritoImagen.png")` }} >
                <Link to="/">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <h3 style={{fontSize:"2.2rem", color:"#464646",paddingLeft:"1.5vw"}}>Tu regalo</h3>
                
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            <input type="text" className="tipoEnvio" placeholder=" ingresa tu codigo" 
                        style={{height:"8vh",marginTop:"2vh",cursor:"text"}}/>
            </div>
        </div>
            
    )
}
const mapStateToProps=(state)=>{
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
export default connect(mapStateToProps,null)(Regalo);