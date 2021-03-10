import React from 'react'
import {connect} from 'react-redux'
import { IoCamera } from 'react-icons/io5'
import {useState} from 'react'
import userActions from '../redux/actions/userActions'
import Swal from 'sweetalert2'

function EditUsuario(props) {
    
    const[editarUsuario, setEditUsuario ] = useState({})
    const [editImagen, setEditImagen] = useState({})
    const [errores, setErrores] = useState([])
    const [visible, setVisible] = useState(false)

    const leerInputPass = e => {
        const valor = e.target.value
        const campo = e.target.name
        setEditUsuario({
            ...editarUsuario,    
            [campo]:valor
        })
    }    

    const leerImPass = e => {
        const valor =e.target.files[0]
        const campo = e.target.name
        setEditImagen({
            ...editImagen,    
            [campo]:valor
        })        
    }


    const cambiarPassword = async e =>{
        e.preventDefault()
        if (editarUsuario.passwordAnterior === '' || editarUsuario.repetirPassword === '' ||
        editarUsuario.password === '') {
            Swal.fire({
                icon: 'error',
                title: '¡Lo siento!',
                text: '¡Todos los campos son requeridos!',
              })

            return false
        }

        if (editarUsuario.passwordAnterior === editarUsuario.repetirPassword) {
            var passwordVerificado = editarUsuario.passwordAnterior
            setEditUsuario({
                ...editarUsuario,    
                passwordVerificado: passwordVerificado
            })
           
        } else{
            Swal.fire({
                icon: 'error',
                title: '¡Lo siento!',
                text: '¡Las contraseñas no coinciden!',
              })
            return false
        }

        console.log(editarUsuario)
        setErrores([])
        const respuesta = await props.editUsuarioPass(editarUsuario, props.loggedUser.id)
        if (respuesta && !respuesta.success) {
            //setErrores(respuesta.errors)
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos deben ser completados',
                showConfirmButton: false,
                timer: 1500
              })
            
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Se han guardado los cambios de manera exitosa',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    

    const cambiarImagen = () =>{
        
        const {imagen} = editImagen
        var formNuevaImg = new FormData();
        formNuevaImg.append("imgFile",imagen)
        props.editarUsuarioImg(formNuevaImg, props.loggedUser.id)
    }
    
    return (
        <div>
            <div className='imgTopUsuario' style={{backgroundImage: `url("https://static.bigbox.com.ar/webSsr/build/trama_usuario.782a82e25f2ec37b2be87b3374f4eb4a.png"`}}>
                <div className='boxUser'>
                    <div className="userIconos">
                        <div className="userImg" style={{backgroundImage: `url("${props.loggedUser.imagen}")`}}></div>
                        <div className="iconoCambiarImg">
                            <p><IoCamera /></p> 
                        </div>
                    </div>
                    <div className="datosUsuaros">
                        <h2>{props.loggedUser && props.loggedUser.nombre}</h2>
                    </div>
                </div>
            </div>
            <div className="editUsuario">
                <form className="modificarEmailUsuario">
                   
                 
                    <input type="password" placeholder="Contraseña anterior" name="passwordAnterior" onChange={leerInputPass} />
               
               
                    <input type="password" placeholder="Repetir contraseña anterior" name="repetirPassword" onChange={leerInputPass} />
            
                                 
                    <div className="cambiarPassword">
                    <p>Cambiar Contraseña</p>
                    <input type="password" placeholder="Nueva Contraseña" name="password" onChange={leerInputPass} />
                </div>
                </form>
                <div className="guardaCambioContraseña" onClick={cambiarPassword} >
                    <p>GUARDAR</p>
                </div>

                {/* <div className="errores">
                      {errores && errores.map(error => <h1>{error}</h1>)}
                    </div> */}
                                  
            </div>
            <div className="editUsuario">
                <div className="modificarEmailUsuario">
                    <label htmlFor="uploadButton" className="inputFile">
                        <p>Cambie Foto</p>
                        <input id="uploadButton" className="imgFile" type="file"  name="imagen" onChange={leerImPass}/>
                    </label>
                </div>
                <div className="guardaCambioContraseña" onClick={cambiarImagen} >
                    <p>CAMBIAR IMG</p>
                </div>
            </div>   

               
        </div>
    )
    
}

const mapStateToProps = state => {
    return{
     loggedUser: state.userReducer.loggedUser
    }
 }
 const mapDispatchToProps = {
     editUsuarioPass: userActions.editUsuarioPass,
     editarUsuarioImg: userActions.editarUsuarioImg
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUsuario)