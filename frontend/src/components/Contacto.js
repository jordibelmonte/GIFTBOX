import {useState} from 'react'

const Contacto = () => {
    const [errors, setErrors]= useState()
    const leerInput = e =>{
        const property= e.target.name
        var value = e.target.value
        }

        const enviarInfo = async (e) =>{
            setErrors([])
            e.preventDefault()           
        }
    return (
        <>
        <div>
            <h2>Contacto</h2>
            <form>
                <input type='text'  name='userFirstName' placeholder='Nombre completo' onChange={leerInput}/>
                <input type='text'  name='userLastName' placeholder='Email*' onChange={leerInput}/>
                <label htmlFor="textarea"><p>Mensaje</p></label>
                <textarea style={{resize:"none"}}  onChange={leerInput}></textarea>
                <button className=""type='submit' onClick={enviarInfo}>Enviar</button>
            </form>            
        </div>
        </>
    )
}

export default Contacto