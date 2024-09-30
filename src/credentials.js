// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATuxMKr0ylQaruROcgf-Ap8651-IisVKk",
    authDomain: "novamarketapp.firebaseapp.com",
    projectId: "novamarketapp",
    storageBucket: "novamarketapp.appspot.com",
    messagingSenderId: "21433362214",
    appId: "1:21433362214:web:b66a900913c514be9643e7",
    measurementId: "G-6RDJ7G6MQE"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
export const auth = getAuth(appFirebase);

export default appFirebase