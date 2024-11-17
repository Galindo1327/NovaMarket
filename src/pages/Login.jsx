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

        history.push('/feed');
    };

    const handleRegisterRedirect = () => {
        history.push('/register');
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#0a0a0a]">
            <IonCard className="w-96 max-w-sm mx-min p-8 bg-[#1a1a1a] shadow-lg rounded-lg border border-gray-700">
                <IonCardHeader className="text-center text-gray-100">
                    <div className="flex justify-center mb-4">
                        <img
                            src={Logo}
                            alt="NovaMarket Logo"
                            className="w-40 h-30"
                        />
                    </div>
                    <IonCardTitle className="text-xl font-semibold text-white ">¡Hola! Bienvenido a NovaMarket</IonCardTitle>
                    <br />
                    <div className="flex flex-col gap-4">
                        <TextField
                            id="outlined-basic"
                            label="Correo electrónico"
                            variant="outlined"
                            error={emailError}
                            helperText={emailError ? "El correo debe incluir '@' y '.com'" : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            InputProps={{
                                style: { backgroundColor: '#2a2a2a', color: 'white' }, // Asegura que el color del texto sea blanco
                            }}
                            InputLabelProps={{
                                style: { color: '#bbbbbb' }, // Color del label
                            }}
                        />
                        <TextField
                            id="outlined-password"
                            label="Contraseña"
                            variant="outlined"
                            error={passwordError}
                            helperText={passwordError ? "Debe tener minúscula, mayúscula, dígito y ser de 6 caracteres o más" : ""}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            InputProps={{
                                style: { backgroundColor: '#2a2a2a', color: 'white' }, // Asegura que el color del texto sea blanco
                            }}
                            InputLabelProps={{
                                style: { color: '#bbbbbb' }, // Color del label
                            }}
                        />

                        <button
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                            onClick={(e) => handleLogin(e)}
                        >
                            LOGIN
                        </button>
                        <button
                            className="text-blue-500 hover:text-blue-700  font-medium text-sm px-5 py-2.5 text-center mb-2"
                            onClick={(e) => handleRegisterRedirect(e)}
                        >
                            ¿No tienes cuenta? Regístrate
                        </button>
                    </div>
                </IonCardHeader>
            </IonCard>
        </div>

    );
}

export default Login;
