import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonButton, IonItem, IonLabel, IonInput, IonIcon } from '@ionic/react';
import { mailOutline, locationOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';import logo from '../assets/logoNova.png';

const Perfil = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <IonAvatar style={{ margin: 'auto', width: '150px', height: '150px' }}>
            <img src="https://via.placeholder.com/150" alt="profile" />
          </IonAvatar>
          <h2>Juan Carlos</h2>
          <p>⭐⭐⭐⭐⭐</p>
        </div>

        <IonItem lines="none">
          <IonIcon icon={mailOutline} slot="start" />
          <IonInput value="Juancarlos18@gmail.com" readonly />
        </IonItem>

        <IonItem lines="none">
          <IonIcon icon={locationOutline} slot="start" />
          <IonInput value="Ubicación" readonly />
        </IonItem>

        <IonItem lines="none">
          <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
          <IonInput value="Envía un mensaje" readonly />
        </IonItem>

        <IonButton expand="full" color="primary" style={{ marginTop: '20px' }}>
          Follow
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
