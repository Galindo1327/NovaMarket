import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput } from '@ionic/react';
import { TextField } from '@mui/material';
import { useAuth } from '../context/authContext';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logoNova.png';

function Register() {
    const auth = useAuth();

    const [nameRegister, setNameRegister] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [phoneRegister, setPhoneRegister] = useState('');
    const [cityRegister, setCityRegister] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [cityError, setCityError] = useState(false);

    console.log('State Form:', emailRegister, passwordRegister);

    const history = useHistory();
    

    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Validación del nombre
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(nameRegister)) {
            setNameError(true);
            return;
        }
        setNameError(false);
    
        // Validación del correo
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailRegister)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    
        // Validación de la contraseña
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(passwordRegister)) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    
        // Validación del teléfono
        const phonePattern = /^[0-9]{10}$/; // Acepta números de 10 dígitos
        if (!phonePattern.test(phoneRegister)) {
            setPhoneError(true);
            return;
        }
        setPhoneError(false);
    
        // Validación de la ciudad
        if (!cityRegister.trim()) {
            setCityError(true);
            return;
        }
        setCityError(false);
    
        try {
           
            await auth.register(emailRegister, passwordRegister, nameRegister, phoneRegister, cityRegister);
            history.push('/login');
        } catch (error) {
            console.error('Error al registrar:', error);
            setRegisterError('Ocurrió un error al registrarte. Intenta de nuevo.');
        }
    };
    
    const handleLoginRedirect = () => {
        history.push('/login');
    };
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#0a0a0a]">
            <IonCard className="w-96 max-w-sm mx-min p-8 bg-[#1a1a1a] shadow-lg rounded-lg border border-gray-700">
                <IonCardHeader className="text-center flex flex-col text-black">
                    <div className="flex justify-center mb-4">
                        <img
                            src={logo}
                            alt="NovaMarket Logo"
                            className="w-40 h-33"
                        />
                    </div>
                    <IonCardTitle className="text-white">NovaMarket</IonCardTitle>
                    <IonCardSubtitle className="text-[#d5d5d5]">Register</IonCardSubtitle>
                    <br />
                    <div className="flex flex-col gap-4">
                        <TextField
                            id="outlined-basic"
                            label="Ingresa Nombre"
                            variant="outlined"
                            error={nameError}
                            helperText={nameError ? 'El nombre solo debe contener letras.' : ''}
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
                            label="Ingresa Teléfono"
                            variant="outlined"
                            error={phoneError}
                            helperText={phoneError ? 'El teléfono debe ser un número de 10 dígitos.' : ''}
                            value={phoneRegister}
                            onChange={(e) => setPhoneRegister(e.target.value)}
                            InputProps={{
                                style: { backgroundColor: '#2a2a2a', color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: '#bbbbbb' },
                            }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Ingresa Ciudad"
                            variant="outlined"
                            error={cityError}
                            helperText={cityError ? 'La ciudad no puede estar vacía.' : ''}
                            value={cityRegister}
                            onChange={(e) => setCityRegister(e.target.value)}
                            InputProps={{
                                style: { backgroundColor: '#2a2a2a', color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: '#bbbbbb' },
                            }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Ingresa Correo Electrónico"
                            variant="outlined"
                            error={emailError}
                            helperText={emailError ? 'El correo electrónico no es válido.' : ''}
                            value={emailRegister}
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
                            error={passwordError}
                            helperText={
                                passwordError
                                    ? 'La contraseña debe tener al menos 6 caracteres, incluir una mayúscula y un dígito.'
                                    : ''
                            }
                            value={passwordRegister}
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
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl 
                            focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium 
                            rounded-lg text-sm px-5 py-2.5 text-center mb-"
                            onClick={(e) => handleRegister(e)}
                        >
                            Registrarse
                        </button>

                        {registerError && (
                            <p className="text-red-500 text-center">{registerError}</p>
                        )}

                        <button
                            className="text-blue-500 hover:text-blue-700  font-medium text-sm px-5 py-2.5 text-center mb-2"
                            onClick={(e) => handleLoginRedirect(e)}
                        >
                            ¿Ya tienes una cuenta? Inicia Sesion!
                        </button>
                    </div>
                </IonCardHeader>
            </IonCard>
        </div>
    );
}

export default Register;
