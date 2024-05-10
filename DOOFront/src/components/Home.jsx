import React from "react"
import appFirebase from '../credenciales'
import {getAuth, signOut} from 'firebase/auth';
const auth = getAuth(appFirebase)

const Home = ({correoUsuario}) =>{
    const [saldo, setSaldo] = React.useState(0);

    React.useEffect(() => {
        setSaldo(0);
    }, [correoUsuario]);

    return(
        <div>
            <h2 className="text-center">Bienvenido usuario {correoUsuario}</h2>
            <h3 className="text-center">Número de cuenta: 02485737636</h3>
            <h3 className="text-center">Saldo: $0.00</h3>
            <button className="btn btn-primary" onClick={()=>signOut(auth)}>Logout</button>
        </div>
    )
} 

export default Home;