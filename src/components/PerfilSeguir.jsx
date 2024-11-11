import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonButton, IonItem, IonLabel, IonInput, IonIcon } from '@ionic/react';
import { mailOutline, locationOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';
import logo from '../assets/logoNova.png';
import { useHistory } from 'react-router-dom';

const Perfil = () => {
  const history = useHistory();
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
          <IonTitle className='text-center' >Perfil</IonTitle>
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
          <IonInput value="Ciudad" readonly />
        </IonItem>

        <IonItem lines="none">
          <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
          <IonInput value="Envía un mensaje" readonly />
        </IonItem>

        <IonButton  expand="full" color="primary" style={{ marginTop: '20px' }}>
          Enviar un mensaje
        </IonButton>
        <IonButton onClick={() => history.goBack()} className="mx-auto block w-1/2 text-center bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">Regresar</IonButton>
      </IonContent>
    </IonPage>
  );
}; 

export default Perfil;
