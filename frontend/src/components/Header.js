import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import Swal from "sweetalert2"
import "../App.css"
import { BiSearch } from 'react-icons/bi'
import { BsHeart } from 'react-icons/bs'
import { IoCartOutline } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md'
import PaquetesHeader from './PaquetesHeader'
import { connect } from 'react-redux'
import userActions from "../redux/actions/userActions"


const Header = ({ carrito, loggedUser, logOut }) => {
    const [mostrarProductos, setMostrarProductos] = useState(true)
    const [visible, setVisible] = useState(false)
    const [isOpen, setOpen] = useState(false)
    console.log(loggedUser)
    return (
        <>
            <div id="headerContainer">
                <Link to='/'><div style={{ backgroundImage: `url("../assets/giftLogoF-01.png")` }} className='logoContainer'></div></Link>
                <div className="paquetesHeader">
                    <PaquetesHeader />
                </div>
                <div className="headerUser centerVerticalColumn">

                    <div className="abrirRegalo centerCenterRow">
                        <p><Link to="/regalo">Abrir mi Regalo</Link></p>
                        {!loggedUser &&
                            <Link to="/registro" className="registroHeader">Registrarse</Link>
                        }
                    </div>
                    <div className="headerUserBottom spaceBetween">
                        {loggedUser ?
                            <>
                                <Link>
                                    <div className="centerCenterRow userName">
                                        <div className="headerTituloPaquetes" onClick={() => setVisible(!visible)}>
                                            <div className="flexRowUsuarios">
                                                <div className="userNav">
                                                    <div className="datosUser" >
                                                        {loggedUser.googleUser === "true"
                                                            ? <div id="userImg" style={{ backgroundImage: `url(${loggedUser.imagen})` }} />
                                                            : <div id="userImg" style={{ backgroundImage: `url("../usuarioImg/${loggedUser.imagen}")` }} />
                                                        }
                                                        <p>{loggedUser.nombre}</p>
                                                        <MdKeyboardArrowDown />
                                                    </div>

                                                    {visible &&
                                                        <div className="linksUsuario">
                                                            <Link to="/usuario" className="logOut paquetesPadres">Mi cuenta</Link>
                                                            <Link to="/editUsuario" className="logOut paquetesPadres">Editar Usuario</Link>
                                                            <Link to="/" onClick={logOut} className="logOut paquetesPadres">LogOut</Link>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </>
                            :
                            <>
                                <div className="headerUserImg" style={{ backgroundImage: `url("../assets/58670.jpg")` }} />
                                <Link to="/iniciarsesion">
                                    <div className="centerCenterRow userName">
                                        <div id="userImg" style={{ backgroundImage: `url("../assets/images.png")` }} />
                                        <p>Mi perfil</p>
                                        <div className="centerCenterRow"><MdKeyboardArrowDown /></div>
                                    </div>
                                </Link>
                            </>
                        }
                        <div className="cartAndHeart">
                            <div className="heart centerCenterRow "><BsHeart /></div>
                            <Link to="/carrito">
                                <div className="cart centerCenterRow ">
                                    <IoCartOutline />
                                    <p>{carrito.length}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="headerResponsive">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </div>


            </div>
            {isOpen &&
                <div className="itemsHeaderResponsive" style={{ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }}>
                    {loggedUser
                        ? <div className="linksUsuarioResponsive">
                            <div className="userHeaderResponsive">
                                {loggedUser.googleUser === "true"
                                    ? <div id="userImg" style={{ backgroundImage: `url(${loggedUser.imagen})` }} />
                                    : <div id="userImg" style={{ backgroundImage: `url("../usuarioImg/${loggedUser.imagen}")` }} />}
                                <p>{loggedUser.nombre}</p>
                            </div>
                            <Link to="/" onClick={logOut}>LogOut</Link>
                            <Link to="/editUsuario">Editar Usuario</Link>
                        </div>
                        : <div>
                            <Link to="/iniciarsesion"  >
                                <div onClick={() => setOpen(false)} className="userNameResponsive">
                                    <div id="userImg" style={{ backgroundImage: `url("../assets/images.png")` }} />
                                    <p onClick={() => setOpen(false)}>Mi perfil</p>
                                    <div className="centerCenterRow"><MdKeyboardArrowDown /></div>
                                </div>
                            </Link>
                        </div>}

                </div>}


        </>
    )
}

const mapStateToProps = state => {
    return {
        carrito: state.carritoReducer.carrito,
        loggedUser: state.userReducer.loggedUser
    }
}

const mapDispatchToProps = {
    logOut: userActions.logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
