import React, { useState } from "react"

import Imagen from '../assets/loginvector.png'
import Imageprofile from '../assets/logo.png'


import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(appFirebase)

const Login = () => {

    const [registrando, setRegistrando] = useState(false)

    const functAutenticacion = async(e) =>{
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
        // Agregar lógica de autenticación aquí
        console.log(correo);
        if(registrando){
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña)
            } catch (error) {
                alert("Asegurese que la contraseña tenga 6 caracteres")
                
            }
        }
        else{
            await signInWithEmailAndPassword(auth, correo, contraseña)
        }
    }

    return(
        <div className="container">
            <div className="row">
                {/*columna mas pequeña*/}
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg " >
                            <img src={Imageprofile} alt="" className="estilo-porfile"/>
                            <form onSubmit={functAutenticacion} >
                                <input type="text" placeholder="Ingresar usuario" className="cajatexto" id="email"/>
                                <input type="password" placeholder="Ingrese pin" className="cajatexto" id="password" />
                                <button className="btnform">{registrando ? "Registrate" : "Inicia Sesion"}</button>
                            </form>
                            <h4>{registrando ?"si ya tienes cuenta":   "No tienes cuenta" }  <button onClick={()=> setRegistrando(!registrando)} className="btnswicht">{registrando ? "inicia sesion":"registrate"}</button></h4>
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