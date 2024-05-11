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
    const [tipoIdentificacionSeleccionado, setTipoIdentificacionSeleccionado] = useState("");
    const [tipoCuentaSeleccionado, setTipoCuentaSeleccionado] = useState("");
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        tidentificacion: '',
        identificacion: '',
        tcuenta: '',
        cuenta: ''
    });

    const toggleMostrarRegistro = () => {
        setMostrarRegistro(!mostrarRegistro);
    };

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
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

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formState.email, formState.password);
            const user = userCredential.user;
            await db.collection('usuarios').doc(user.uid).set({
                tidentificacion: formState.tidentificacion,
                identificacion: formState.identificacion,
                tcuenta: formState.tcuenta,
                cuenta: formState.cuenta,
                email: user.email,
                createdAt: new Date(),
            });
            console.log('Usuario registrado con correo:', user.email);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    const tiposIdentificacion = ["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"];
    const tiposCuenta = ["Usuario", "vendedor", "Administrador"];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg ">
                            <img src={Imageprofile} alt="" className="estilo-porfile" />
                            <form onSubmit={functAutenticacion}>
                                <input type="email" placeholder="Ingresar usuario" className="cajatexto" id="email" name="email" required onChange={handleInputChange} value={formState.email} />
                                <input type="password" placeholder="Ingrese pin" className="cajatexto" id="password" name="password" required onChange={handleInputChange} value={formState.password} />
                                <button className="btnform">{registrando ? "Registrate" : "Inicia Sesión"}</button>
                            </form>
                            <h6>{registrando ? "Si ya tienes cuenta" : "¿No tienes cuenta?"}</h6>
                            <button onClick={toggleMostrarRegistro} className="btnswicht2">
                                {mostrarRegistro ? "Cancelar Registro" : "Registrate"}
                            </button>
                            {mostrarRegistro && (
                                <form onSubmit={handleSubmitRegistro}>
                                    <h1></h1>
                                    <input type="email" placeholder="Correo" className="cajatexto" id="email" name="email" required onChange={handleInputChange} value={formState.email} />
                                    <input type="password" placeholder="Contraseña" className="cajatexto" id="password" name="password" required onChange={handleInputChange} value={formState.password} />
                                    <select className="cajatexto" id="tidentificacion" name="tidentificacion" value={formState.tidentificacion} onChange={handleInputChange} required>
                                        <option value="">Tipo de identificación</option>
                                        {tiposIdentificacion.map((tipo, index) => (
                                            <option key={index} value={tipo}>{tipo}</option>
                                        ))}
                                    </select>
                                    <input type="text" placeholder="Número de Identificación" className="cajatexto" id="identificacion" name="identificacion" value={formState.identificacion} onChange={handleInputChange} required />
                                    <select className="cajatexto" id="tcuenta" name="tcuenta" value={formState.tcuenta} onChange={handleInputChange} required>
                                        <option value="">Tipo de cuenta</option>
                                        {tiposCuenta.map((tipo, index) => (
                                            <option key={index} value={tipo}>{tipo}</option>
                                        ))}
                                    </select>
                                    <input type="text" placeholder="Nombre de usuario" className="cajatexto" id="cuenta" name="cuenta" value={formState.cuenta} onChange={handleInputChange} required />
                                    <button className="btnform">Registrar</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <img src={Imagen} alt="" className="tamaño-imagen2" />
                </div>
            </div>
        </div>
    );
};

export default Login;
