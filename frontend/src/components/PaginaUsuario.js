import { connect } from 'mongoose'
import React from 'react'
import {useState,useEffect} from 'react'
import { IoCamera } from 'react-icons/io5'
import EditUsuario from '../components/EditUsuario'
import RegalosRecibidos from '../components/RegalosRecibidos'
import ComprasRealizadas from '../components/ComprasRealizadas'
import ComprasGrupales from '../components/ComprasGrupales'
import Credito from '../components/Credito'

 

const PaginaUsuario = () => {
    
    const[editUsuario, setEdittUsuario] = useState(false)
    const[opcionDiv, setOpciondiv] = useState(null)

    function regalo() {
        setEdittUsuario(true)
        setOpciondiv("regalos")        
    }
    function compRealizadas() {
        setEdittUsuario(true)
        setOpciondiv("realizados")  
    }
    function compGrupales() {
        setEdittUsuario(true)
        setOpciondiv("grupales")  
    }
    function credito() {
        setEdittUsuario(true)
        setOpciondiv("creditos")  
    }

    return (
        <>
        <div>
            <div className='imgTopUsuario'>
                <div className='boxUser'>
                    <div className="userIconos">
                        <div className="userImg" /*style={{backgroundImage: `url("/userImages/${loggedUser.imagen}")`}}*//>
                        <div className="iconoCambiarImg">
                            <p ><IoCamera /></p> 
                        </div>
                    </div>
                    <div className="datosUsuaros">
                        <h2>Nombre del Usuario</h2>
                        <h2>Mail del usuario</h2>
                    </div>
                </div>
            </div>
            <div>
                {editUsuario && 
                    <button onClick={setEdittUsuario(false)}>Editar perfil</button>
                }
            </div> 
        </div>
        <div className="boxOpcionesUsuario">
            <div className="boxChicaUsuario">
                <div className="menuOpcionesUsuario">
                    <div onClick={regalo}><h3>Regalos recibidos</h3></div>
                    <div onClick={compRealizadas}><h3>Compras Realizadas</h3></div>
                    <div onClick={compGrupales}><h3>Compras grupales</h3></div>
                    <div onClick={credito}><h3>Crédito</h3></div>
                </div>
                <div>
                    {editUsuario ? <EditUsuario/>
                    :<>
                        {opcionDiv === "regalos" ? <RegalosRecibidos/>
                        :<>
                            {opcionDiv === "realizados" ? <ComprasRealizadas/>
                            :<>
                                {opcionDiv === "realizados" ? <ComprasGrupales/>

                                :<Credito/>
                                }
                            </>}          
                        </>}
                    </>
                    }
                </div>
            </div>
        </div>
        </>

    )
}


// const mapStateToProps=state=>{
//     return{
//         loggedUser: state.user.loggedUser,
//     }
// }
export default PaginaUsuario