import { createContext, useContext } from "react";
import { auth, db } from "../credentials";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;

            await updateProfile(user, { displayName: name });

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

    const getUserInfo = async (userId) => {
        try {
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                console.log("No hay suficiente documento");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener la información del usuario:", error);
            throw error;
        }
    };

    return <authContext.Provider value={{ register, login, getUserInfo }}>{children}</authContext.Provider>;
}
