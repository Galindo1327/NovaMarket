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
import { useLocation } from 'react-router-dom';

const Perfil = () => {
  const location = useLocation();
  const { usuarioId } = location.state || {};
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("usuarioId:", usuarioId)
    if (usuarioId) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, 'users', usuarioId));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        } else {
          console.log("No se encontró el usuario.");
        }
      };
      fetchUser();
    }
  }, [usuarioId]);

  if (!userInfo) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <div className="bg-[#0070ff] py-5 text-white relative flex items-center justify-between rounded-b-lg">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-24 p-2  sm:w-36 md:w-38 lg:w-46 xl:w-50 max-w-full ml-4" 
          />
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
                <img src={userInfo.profileImage} alt="Avatar del usuario" />
              </IonAvatar>

              <h2 className="mt-16">{userInfo.name}</h2>
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
                    <h2 className="ion-no-margin">{userInfo.direccion}</h2>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonIcon icon={callOutline} size="large" />
                  </IonCol>
                  <IonCol>
                    <h2 className="ion-no-margin">{userInfo.telefono}</h2>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-around ion-padding-top">
            <IonCol size="auto">
              <IonButton className="w-full text-white hover:bg-blue-700" onClick={() => window.history.back()}>
                <IonIcon icon={arrowBackOutline} slot="start" />
                Regresar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;