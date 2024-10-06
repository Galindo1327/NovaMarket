import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput } from '@ionic/react';
import { Card, TextField } from '@mui/material';
import { useAuth } from '../context/authContext';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/logoNova.png';

function Login() {
    const auth = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
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

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        auth.login(email, password);

        history.push('/home');
    };

    return (
        <div className="w-screen h-screen flex justify-center bg-[#ffffff] items-center">
            <IonCard  className="w-96 max-w-sm mx-min p-8 bg-[#e5fff9]">
                <IonCardHeader className="text-center text-black">
                    <div className="flex justify-center mb-4">
                        <img
                            src={Logo}
                            alt="NovaMarket Logo"
                            className="w-40 h-30"
                        />
                    </div>
                    <IonCardTitle>¡Hola! Bienvenido a NovaMarket</IonCardTitle>
                    <br />
                    <div className="flex flex-col gap-4">
                        <TextField
                            id="outlined-basic"
                            label="Ingresa correo electrónico"
                            variant="outlined"
                            error={emailError}
                            helperText={emailError ? "Los correos deben incluir '@' y '.com'" : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            InputProps={{
                                style: { backgroundColor: 'white' } // Fondo blanco para los campos de texto
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Ingresa Contraseña"
                            variant="outlined"
                            error={passwordError}
                            helperText={passwordError ? "La contraseña debe tener al menos una minúscula, una mayúscula, un dígito y ser de 6 caracteres o más" : ""}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            InputProps={{
                                style: { backgroundColor: 'white' } // Fondo blanco para los campos de texto
                            }}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" id="rememberMe" />
                                <label htmlFor="rememberMe" className="text-gray-600">Remember me</label>
                            </div>
                            <a href="/reset-password" className="text-blue-600">Reset Password!</a>
                        </div>

                        <button
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                            onClick={(e) => handleLogin(e)}
                        >
                            LOGIN
                        </button>
                    </div>
                </IonCardHeader>
            </IonCard>
        </div>
    );
}

export default Login;
