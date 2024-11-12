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
import { mailOutline, locationOutline, callOutline, chatbubbleOutline, arrowBackOutline, personAddOutline } from 'ionicons/icons'; // Importa los íconos necesarios
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../credentials';
import logo from '../assets/logoNova.png';

const Perfil = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [userData2, setUserData2] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
  });
  const userId = 'perfilUsuario'; // Cambiar por el ID real del usuario

  const fetchUserData2 = async () => {
    try {
      const userDocRef = doc(db, 'usuarios', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserData2(docSnap.data());
        if (docSnap.data().profileImage) {
          setProfileImage(docSnap.data().profileImage);
        }
      } else {
        console.log('No se encontró el documento del usuario');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    fetchUserData2();
  }, []);

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
              
              <h2 className="mt-2">{userData2.nombre}</h2>
              <p>⭐⭐⭐⭐⭐</p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding">
            <IonCol size="12" className="ion-text-left"> {/* Justificación a la izquierda */}
              <IonGrid>
                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonIcon icon={mailOutline} size="large" />
                  </IonCol>
                  <IonCol>
                    <h2 className="ion-no-margin">{userData2.email}</h2>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonIcon icon={locationOutline} size="large" />
                  </IonCol>
                  <IonCol>
                    <h2 className="ion-no-margin">{userData2.direccion}</h2>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonIcon icon={callOutline} size="large" />
                  </IonCol>
                  <IonCol>
                    <h2 className="ion-no-margin">{userData2.telefono}</h2>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-around ion-padding-top"> {/* Botones alineados */}
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
