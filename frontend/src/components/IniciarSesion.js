import { connect } from 'react-redux'
import React, { useState } from 'react'
import userActions from '../redux/actions/userActions'
import GoogleLogin from 'react-google-login';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
// import { Alert } from 'rsuite'

const IniciarSesion = (props) => {
    const [usuarioALoguear, setUsuarioALoguear] = useState({})
    const [errores, setErrores] = useState([])
    const [visible, setVisible] = useState(false)

    const leerInput = e => {
        const valor = e.target.value
        const campo = e.target.name
        setUsuarioALoguear({
            ...usuarioALoguear,
            [campo]: valor
        })
    }

    const validarUsuario = async e => {
        e.preventDefault()
        setErrores([])
        if (usuarioALoguear.cuenta === '' || usuarioALoguear.password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Uy...',
                text: '¡Se necesitan llenar todos los campos!',
            })
            return false
        }

        const respuesta = await props.iniciarSesion(usuarioALoguear)
        if (respuesta && !respuesta.success) {
            setErrores([respuesta.errors])
        } else {
            console.log("entré al else")
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido a Gift Box',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                props.history.push('/')
            })
        }
    }

    const responseGoogle = async (response) => {

        if (response.error) {
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: '¡Algo ha ocurrido!',
            })
        } else {
            const respuesta = await props.iniciarSesion({
                cuenta: response.profileObj.email,
                password: response.profileObj.googleId,
            })
            if (respuesta && !respuesta.success) {
                setErrores([respuesta.errors])
            } else {
                Swal.fire({
                    title: 'Welcome back!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                        (
                            props.history.push('/')
                        )
                    }
                })
            }
        }
    }


    return (
        <div className="editUsuario">
            <div className="modificarEmailUsuario">
                <h1 className="logeo">Login</h1>
                <input type="text" name="cuenta" placeholder="Nombre de usuario"
                    onChange={leerInput} />

                        <div className="a">
                        <input className="inputRegisterPassword" type={visible ? "text" : "password"} name="password" placeholder="Contraseña nueva" onChange={leerInput} />
                        <div className='ojito'><i className={visible ? "far fa-eye-slash" : "far fa-eye"} onClick={() => setVisible(!visible)}></i></div>
                    </div>
            
                    </div>

            <div className="guardaCambioContraseña">
                <p onClick={validarUsuario}>Login</p>
            </div>
            <GoogleLogin className="googlecito"
            clientId="958442334135-59seulshhm4396e4ls8f3uugeggsenag.apps.googleusercontent.com"
            buttonText="Inicia sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />

            <div className="errores">
                {errores.map(error => <h1>{error}</h1>)}
            </div>

            <Link to='/registro' className="pLinksEntreCuentas"><p>No tienes cuenta? Haz click aquí</p></Link>

            <Link to="/recuperar-password"><h5>Olvidaste tu contraseña?</h5></Link>
            
        </div>
      


    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
}

const mapDispatchToProps = {
    iniciarSesion: userActions.iniciarSesion
}

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesion)