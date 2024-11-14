import React, { useState } from 'react'
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput } from '@ionic/react'
import { Card, TextField } from '@mui/material'
import { useAuth } from '../context/authContext'    // No le hagan caso a este error XD
import { useHistory } from 'react-router-dom';
import logo from '../assets/logoNova.png';

function Register() {
    const auth = useAuth();

    const [nameRegister, setNameRegister] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    console.log("State Form:", emailRegister, passwordRegister);

    const history = useHistory();

    const handleRegister = (e) => {
        e.preventDefault();

        const namePattern = /^[A-Za-z]+$/;
        if (!namePattern.test(nameRegister)) {
            setNameError(true);
            return;
        }
        setNameError(false);

        const emailPattern = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
        if (!emailPattern.test(emailRegister)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!passwordPattern.test(passwordRegister)) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        auth.register(emailRegister, passwordRegister, nameRegister);

        history.push('/login');
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#0a0a0a]">
            <IonCard className="w-96 max-w-sm mx-min p-8 bg-[#1a1a1a] shadow-lg rounded-lg border border-gray-700">
                <IonCardHeader className='text-center text-black'>
                    <div className="flex justify-center mb-4">
                        <img    //Logo importado
                            src={logo}
                            alt="NovaMarket Logo"
                            className="w-40 h-33"
                        />
                    </div>
                    <IonCardTitle className='text-white'>NovaMarket</IonCardTitle>
                    <IonCardSubtitle className='text-[#d5d5d5]'>Register</IonCardSubtitle>
                    <br />
                    <div className='flex flex-col gap-4'>
                        <TextField 
                        id="outlined-basic" 
                        label="Ingresa Nombre" 
                        variant="outlined" 
                        error={nameError}
                        helperText={nameError ? "El nombre solo debe contener letras de la A-Z.":""}
                        value={nameRegister}
                        onChange={(e) => setNameRegister(e.target.value)}
                        InputProps={{
                            style: { backgroundColor: '#2a2a2a', color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: '#bbbbbb' },
                        }}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Ingresa Correo electronico" 
                            variant="outlined" 
                            error = {emailError}
                            helperText={emailError ? "Los correos electronicos deben de tener un '@' y '.com'" : ""}
                            onChange={(e) => setEmailRegister(e.target.value)}
                            type="email"
                            InputProps={{
                                style: { backgroundColor: '#2a2a2a', color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: '#bbbbbb' },
                            }}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Ingresa Contraseña" 
                            variant="outlined"
                            error = {passwordError}
                            helperText={passwordError ? "Las contraseñas deben de tener como minimo una minuscula, una mayuscula, un digito y una longitud de 6 caracteres" : ""}
                            onChange={(e) => setPasswordRegister(e.target.value)}
                            type="password"
                            InputProps={{
                                style: { backgroundColor: '#2a2a2a', color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: '#bbbbbb' },
                            }}
                        />
                        <button 
                            className='text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2' 
                            onClick={(e) => handleRegister(e)}
                        >Registrarse</button>
                    </div>
                </IonCardHeader>
            </IonCard>
        </div>
    )
}

export default Register