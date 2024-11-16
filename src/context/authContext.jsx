import { createContext, useContext } from "react";
import { auth, db } from "../credentials"; // Asegúrate de importar `db` para Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Importa las funciones necesarias para Firestore

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        console.log("Error creando el contexto de autenticación");
    }
    return context;
};

export function AuthProvider({ children }) {
    const register = async (email, password, name) => {
        try {
            // Crea el usuario en Firebase Authentication
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;

            // Guarda el nombre y el correo en Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            });

            console.log("Usuario registrado y datos guardados en Firestore:", user.uid);
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    return <authContext.Provider value={{ register, login }}>{children}</authContext.Provider>;
}
