import React, { useState } from "react"
import Imagen from '../assets/loginvector.png'
import Imageprofile from '../assets/logo.png'

import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(appFirebase)

const Login = () => {

    const [regitrando, setRegistrando] = useState(false)
    return(
        <div className="container">
            <div className="row">
                {/*columna mas peuqeña*/}
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg " >
                            <img src={Imageprofile} alt="" className="estilo-porfile"/>
                            <form >
                                <input type="text" placeholder="Ingresar usuario" className="cajatexto" />
                                <input type="pasword" placeholder="Ingrese pin" className="cajatexto" />
                                <button className="btnform">{regitrando ? "Rgistrate ": "Inicia Sesion"}</button>

                            </form>
                            <h4>No tienes cuenta:  <button className="btnswicht">Registrate</button></h4>
                        </div>

                    </div>
                </div>
                {/*columna mas grande*/}
                <div className="col-md-8">
                    <img src={Imagen} alt="" className="tamaño-imagen2"/>
                
                </div>

            </div>            
        </div>
    )
}
export default Login

