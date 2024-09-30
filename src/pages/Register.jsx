import React, { useState } from 'react'
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput } from '@ionic/react'
import { Card, TextField } from '@mui/material'
import { useAuth } from '../context/authContext'    // No le hagan caso a este error XD

function Register() {
    const auth = useAuth();

    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    console.log("State Form:", emailRegister, passwordRegister);

    const handleRegister = (e) => {
        e.preventDefault();
        auth.register(emailRegister, passwordRegister);
    };

    return (
        <div className="w-screen h-screen flex justify-center bg-sky-800 items-center">
            <IonCard color="dark" className='w-96 max-w-sm mx-min'>
                <IonCardHeader className='text-center text-black'>
                    <IonCardTitle>NovaMarket</IonCardTitle>
                    <IonCardSubtitle>Register</IonCardSubtitle>
                    <br />
                    <div className='flex flex-col gap-4'>
                        <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField 
                            id="outlined-basic" 
                            label="Correo" 
                            variant="outlined" 
                            onChange={(e) => setEmailRegister(e.target.value)}
                            type="email"
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Contraseña" 
                            variant="outlined" 
                            onChange={(e) => setPasswordRegister(e.target.value)}
                            type="password"
                        />
                        <button 
                            className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2' 
                            onClick={(e) => handleRegister(e)}
                        >hola</button>
                    </div>
                </IonCardHeader>
            </IonCard>
        </div>
    )
}

export default Register