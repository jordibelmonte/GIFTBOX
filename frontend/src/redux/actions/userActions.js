import axios from "axios"
import Swal from'sweetalert2';


const userActions={
    crearCuenta: (formNuevoUsuario) => {
        return async (dispatch,getstate) => {
            try{
              const data = await axios.post("http://localhost:4000/api/usuarios",formNuevoUsuario,{
                headers: {"Content-Type": "multipart: form-data"}
              }); 
              console.log(data.data.success)
              if (data.data.success){
                console.log(data.data.response)
                console.log("ACTIONS")                
                dispatch({type:'INICIAR_SESION', payload:data.data})
                return data.data.response
              } else{
                return data.data
              }
              }catch(error){
                  console.log(data.data)
                const data =[{errors:'Paso algo...'}]
                return data.data
              }
          }
       
    },
    cerrarSesion: () => {
        return (dispatch, getState) => {
            dispatch({type: 'CERRAR_SESION'})
        }
    },
    logFromLS: (token) => {
        return async (dispatch, getState) => {
            try {
                const respuesta = await axios.post('http://localhost:4000/api/usuarios/ls', {token}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                dispatch({type: 'INICIAR_SESION', payload: {response: {...respuesta.data.response}}})
            } catch(err) {
                localStorage.clear()
            }
        }
    },
     resetearPassword: (cuenta)=> {
        return async (dispatch) => {
            try{
                const response = await axios.post('http://localhost:4000/api/user/resetear-password', {cuenta})
                console.log(response)
                dispatch({type: 'RESETEAR_PASSWORD'})
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: "Algo salio mal, intenta nuevamente!",
                    showConfirmButton: false,
                    timer: 4000
                    })
            }
        }
    },   
    logOut:()=>{
        return (dispatch, getState)=>{
            try{
                dispatch({type:"LOG_OUT"})
            }
            catch(err){
                console.log(err)
            }
        }
      },
    iniciarSesion: (usuario) => {
        console.log(usuario)
        return async (dispatch, getState) => {
            const respuesta = await axios.post('http://localhost:4000/api/login', usuario)
            if (!respuesta.data.success) {
                console.log(respuesta)
                return respuesta.data
            }
            dispatch({type:'INICIAR_SESION', payload: respuesta.data})
        }
    },
    editUsuarioPass : (editarUsuario, id) => {
        console.log("ACTIONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
        console.log(editarUsuario)
        return async (dispatch, getState)=> {
            const respuesta = await axios.put(`http://localhost:4000/api/usuarios/${id}`, editarUsuario )
            console.log(respuesta.data)
            if(!respuesta.data.success){
                return respuesta.data 
            }
            else{
                dispatch({type:'EDITAR_PASS', payload:respuesta.data})

                return respuesta.data
            }
        }
    },
    cambiarPassword : (editUsuario) => {
        console.log(editUsuario)
        return async (dispatch, getState)=> {
            const respuesta = await axios.put("http://localhost:4000/api//cambiar-password", editUsuario)
            console.log(respuesta)
            if(!respuesta.data.success){
            console.log('me fui')
            return respuesta.data 
        }
        }
    },
    editarUsuarioImg : (formNuevaImg, id) => {
        
        return async (dispatch, getState)=> {
            const respuesta = await axios.put(`http://localhost:4000/api/imagen/${id}`, formNuevaImg)
            
            if(respuesta.data.success){
                dispatch({type:'EDITAR_FOTO', payload: respuesta.data})
                console.log('llegue a Imagen')
                console.log(respuesta.data)
                return respuesta.data             
        }
        }
    }
}
export default userActions;