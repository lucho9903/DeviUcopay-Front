import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Imageprofile from '../assets/logo.png';
import Imagen from '../assets/loginvector.png';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const Login = () => {
    const [registrando, setRegistrando] = useState(false);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);

    const toggleMostrarRegistro = () => {
        setMostrarRegistro(!mostrarRegistro);
    };

    const functAutenticacion = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;

        if (registrando) {
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña);
            } catch (error) {
                alert("Asegúrese de que la contraseña tenga al menos 6 caracteres");
            }
        } else {
            await signInWithEmailAndPassword(auth, correo, contraseña);
        }
    };

    const handleSubmitRegistro = async (e) => {
        e.preventDefault();
        const correo = e.target[0].value;
        const contraseña = e.target[1].value;
        const identificacion = e.target[2].value;
        const cuenta = e.target[3].value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
            const user = userCredential.user;
            await db.collection('usuarios').doc(user.uid).set({
                identificacion,
                cuenta,
                email: user.email,
                createdAt: new Date(),
            });
            console.log('Usuario registrado con correo:', user.email);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                {/* Columna más pequeña */}
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg ">
                            <img src={Imageprofile} alt="" className="estilo-porfile" />
                            <form onSubmit={functAutenticacion}>
                                <input type="email" placeholder="Ingresar usuario" className="cajatexto" id="email" name="email" required />
                                <input type="password" placeholder="Ingrese pin" className="cajatexto" id="password" name="password" required />
                                <button className="btnform">{registrando ? "Registrate" : "Inicia Sesión"}</button>
                            </form>
                            <h4>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}</h4>
                            <button onClick={toggleMostrarRegistro} className="btnswicht">
                                {mostrarRegistro ? "Cerrar Registro" : "Registrate"}
                            </button>
                            {mostrarRegistro && (
                                <form onSubmit={handleSubmitRegistro}>
                                    <input type="email" placeholder="Correo" name="email" required />
                                    <input type="password" placeholder="Contraseña" name="password" required />
                                    <input type="text" placeholder="Número de Identificación" name="identificacion" required />
                                    <input type="text" placeholder="Número de Cuenta" name="cuenta" required />
                                    <button type="submit">Registrarse</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                {/* Columna más grande */}
                <div className="col-md-8">
                    <img src={Imagen} alt="" className="tamaño-imagen2" />
                </div>
            </div>
        </div>
    );
};

export default Login;
