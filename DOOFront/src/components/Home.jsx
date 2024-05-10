import React from "react";
import appFirebase from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import Imagen from '../assets/loginvector.png';
import Imageprofile from '../assets/logo.png';
const auth = getAuth(appFirebase);

const Home = ({ correoUsuario }) => {
    const [saldo, setSaldo] = React.useState(0);

    React.useEffect(() => {
        setSaldo(0);
    }, [correoUsuario]);

    return (
        <div constyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '20px',
        }} className="container h-full w-full flex justify-content-center align-items-center ">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '600px',
            }} 
            className="row ">
                <div className="col-md-4 ">
                    <img src={Imageprofile} alt="" style={{ maxWidth: '200px', margin: '20px auto' }} className="img-fluid" />
                        <div style={{ display: 'inline-block' }}>
                        <div style={{
                            fontSize: '25px',
                            color: 'black',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            margin: '15px, 0',
                            fontWeight: 'bold',
                        }}>
                            Bienvenido usuario: {correoUsuario}
                        </div>
                        
                    </div>

                    <div style={{ display: 'inline-block', marginRight: '20px' }}>
                        <h3 style={{
                            fontSize: '24px',
                            color: 'black',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            margin: '15px, 0',
                            fontWeight: 'bold',
                        }}>Número de cuenta: 02485737636</h3>
                        <h3 style={{
                            fontSize: '24px',
                            color: 'black',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            margin: '15px, 0',
                            fontWeight: 'bold',
                        }}>Saldo: $0.00</h3>
                    </div>

                    <button style={{
                        backgroundColor: '#09600a'  ,
                        borderColor: 'slategray',
                        borderCadius: '30px',
                        width: '100%',
                        padding: '15px',
                        borderWidth: '0px',
                        marginBottom: '20px',
                        color: 'white',

                    }}
                    className="btn btn-primary" onClick={() => signOut(auth)}>Logout</button>
                </div>
                <div className="col-md-8 ">
                    <div className="row">
                        <div className="col-md-12" style={{ textAlign: 'right' }}>
                            <img src={Imagen} alt="" style={{ maxWidth: '700px', height: '400px', margin: '20px 20px 20px auto' }} className="img-fluid" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home;
