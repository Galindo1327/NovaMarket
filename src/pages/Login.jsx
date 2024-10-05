import React, { useState } from 'react'
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput } from '@ionic/react'
import { Card, TextField } from '@mui/material'
import { useAuth } from '../context/authContext'
import { useHistory } from 'react-router-dom';
import Logo from '../assets/logoNova.png';

function Login() {
    const auth = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    console.log("State Form:", email, password);

    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
        if (!emailPattern.test(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!passwordPattern.test(password)) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        auth.login(email, password);

        history.push('/home');
    };


    return (
        <div className="w-screen h-screen flex justify-center bg-sky-800 items-center">
    <IonCard color="dark" className='w-96 max-w-sm mx-min'>
        <IonCardHeader className='text-center text-black'>
            {/* Añade el logo aquí */}
            <div className='flex justify-center mb-4'>
                <img 
                    src={Logo} 
                    alt="NovaMarket Logo" 
                    className="w-20 h-20" // Puedes ajustar las dimensiones según el tamaño deseado
                />
            </div>
            <IonCardTitle>NovaMarket</IonCardTitle>
            <IonCardSubtitle>Log In</IonCardSubtitle>
            <br />
            <div className='flex flex-col gap-4'>
                <TextField 
                    id="outlined-basic" 
                    label="Correo" 
                    variant="outlined" 
                    error = {emailError}
                    helperText={emailError ? "Los correos electronicos deben de tener un '@' y '.com'" : ""}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                <TextField 
                    id="outlined-basic" 
                    label="Contraseña" 
                    variant="outlined"
                    error = {passwordError}
                    helperText={passwordError ? "Las contraseñas deben de tener como minimo una minuscula, una mayuscula, un digito y una longitud de 6 caracteres" : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <a
                    href="/register"
                    className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                >¿No tienes cuenta?</a>
                <button 
                    className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2' 
                    onClick={(e) => handleLogin(e)}
                >Log In</button>
            </div>
        </IonCardHeader>
    </IonCard>
</div>

    )
}

export default Login
