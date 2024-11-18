import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { mailOutline, locationOutline, callOutline, chatbubbleOutline, arrowBackOutline, personAddOutline } from 'ionicons/icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../credentials';
import logo from '../assets/logoNova.png';
import { getAuth } from "firebase/auth";

const Perfil = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [userData, setUserData] = useState({
    name: '',
    direccion: '',
    telefono: '',
  });

  const auth = getAuth();
  const userId = "perfilUsuario";

  const fetchUserData = async () => {
    try {
      const userDocRef = doc(db, 'usuarios', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserData(userData);
        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }
      } else {
        console.log('No se encontró el documento del usuario');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  
  useEffect(() => {
    if (userId) {
      fetchUserData();

    } else {
      console.log('El usuario no está autenticado.');
    }
  }, [userId]); 

  return (
    <IonPage>
      <IonHeader>
      <div className="bg-[#0070ff] py-5 text-white relative flex items-center justify-between">
        {/* Logo alineado a la izquierda */}
        <img 
          src={logo} 
          alt="Logo" 
          className="w-24 p-2  sm:w-36 md:w-38 lg:w-46 xl:w-50 max-w-full ml-4" 
        />
        {/* Título centrado responsivamente */}
        <h1 className="absolute ml-14 inset-0 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
          <a 
            href="/feed" 
            className="text-white hover:underline cursor-pointer"
          >
            NovaMarket
          </a>
        </h1>
      </div>
        <IonToolbar>
          <IonTitle className="text-center">Perfil Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              <IonAvatar style={{ margin: '0 auto', width: '120px', height: '120px' }}>
                <img src={profileImage} alt="Avatar del usuario" />
              </IonAvatar>
              <br />
              <br />
              <br />
              <br />

              <h2 className="mt-2">{userData.name}</h2>
              <p>⭐⭐⭐⭐⭐</p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding">
            <IonCol size="12" className="ion-text-left">
              <IonGrid>
                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonIcon icon={locationOutline} size="large" />
                  </IonCol>
                  <IonCol>
                    <h2 className="ion-no-margin">{userData.direccion}</h2>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonIcon icon={callOutline} size="large" />
                  </IonCol>
                  <IonCol>
                    <h2 className="ion-no-margin">{userData.telefono}</h2>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-around ion-padding-top">
            <IonCol size="auto">
              <IonButton color="primary">
                <IonIcon icon={chatbubbleOutline} slot="start" />
                Enviar mensaje
              </IonButton>
            </IonCol>
            <IonCol size="auto">
              <IonButton color="secondary" onClick={() => window.history.back()}>
                <IonIcon icon={arrowBackOutline} slot="start" />
                Regresar
              </IonButton>
            </IonCol>
            <IonCol size="auto">
              <IonButton color="success">
                <IonIcon icon={personAddOutline} slot="start" />
                Seguir
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;