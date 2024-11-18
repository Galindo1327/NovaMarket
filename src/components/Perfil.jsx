import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from "@ionic/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { storage, db } from "../credentials"; 
import logo from "../assets/logoNova.png";
import { getAuth } from "firebase/auth";

const Perfil = () => {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    direccion: "",
    telefono: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [newProfileImage, setNewProfileImage] = useState(null); 

  const auth = getAuth();
  const userId = auth.currentUser?.uid;


  const fetchUserData = async () => {
    if (!userId) {
      console.error("No hay un usuario autenticado");
      return;
    }
    try {
      const userDocRef = doc(db, "users", userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        if (docSnap.data().profileImage) {
          setProfileImage(docSnap.data().profileImage);
        }
      } else {
        console.log("No se encontró el documento del usuario");
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!newProfileImage || !userId) return;

    try {
      const imageRef = ref(storage, `profileImages/${userId}`);
      await uploadBytes(imageRef, newProfileImage);

      const downloadURL = await getDownloadURL(imageRef);
      setProfileImage(downloadURL); 

      
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { profileImage: downloadURL }, { merge: true });
      console.log("Imagen de perfil actualizada.");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const saveChanges = async () => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, userData, { merge: true });

      setEditing(false);
      console.log("Cambios guardados:", userData);
    } catch (error) {
      console.error("Error guardando los cambios: ", error);
    }

    if (newProfileImage) {
      await uploadImage(); 
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="bg-blue-800 py-5 text-center text-white relative flex items-center justify-center">
          <h1 className="text-4xl font-bold mb-2 mr-2">NovaMarket</h1>
          <div className="mt-2">
            <img
              src={logo}
              alt="Logo"
              className="absolute right-4 top-4 w-10 sm:w-12 md:w-14 lg:w-16 xl:w-19 max-w-xs"
            />
          </div>
        </div>
        <IonToolbar>
          <IonTitle className="text-center">Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              <IonAvatar
                style={{ margin: "0 auto", width: "120px", height: "120px" }}
              >
                <img src={profileImage} alt="Avatar del usuario" />
              </IonAvatar>
              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ marginTop: "10px" }}
                />
              )}
            </IonCol>
          </IonRow>

          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              {editing ? (
                <IonInput
                  value={userData.name}
                  name="name"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData.name}</p>
              )}
            </IonItem>

            
            <IonItem>
              <IonLabel position="stacked">Ciudad</IonLabel>
              {editing ? (
                <IonInput
                  value={userData.direccion}
                  name="direccion"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData.direccion}</p>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Teléfono</IonLabel>
              {editing ? (
                <IonInput
                  value={userData.telefono}
                  name="telefono"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData.telefono}</p>
              )}
            </IonItem>
          </IonList>

          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="auto">
              {editing ? (
                <IonButton onClick={saveChanges}>Guardar Cambios</IonButton>
              ) : (
                <IonButton onClick={() => setEditing(true)}>
                  Editar Perfil
                </IonButton>
              )}
            </IonCol>
          </IonRow>
          <IonButton
            onClick={() => history.goBack()}
            className="mx-auto block w-1/2 text-center bg-blue-800 text-white border border-blue-400 hover:bg-blue-700"
          >
            Regresar
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
