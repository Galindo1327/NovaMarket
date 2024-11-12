import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonButton, IonItem, IonInput, IonIcon } from '@ionic/react';
import { mailOutline, locationOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';
import logo from '../assets/logoNova.png';
import { useHistory } from 'react-router-dom';
import dimadon from '../assets/dondimadon.png';

const PerfilSeguir = () => {
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    name: 'Don dimadon',
    email: 'dondimadon@gmail.dimadon',
    location: 'Dimmsdale',
    profileImage: dimadon,
    phone: '0-1000-Dimmsdale',
    authorName: 'Don dimadon, heredero de la fortuna del Domodín de Dimmsdale', // Aquí vamos a guardar el nombre del autor de la publicación
  });


  


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
          <IonTitle className='text-center'>Perfil Seguir</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <IonAvatar style={{ margin: 'auto', width: '150px', height: '150px' }}>
            <img src={profileData.profileImage} alt="Don dimadon" />
          </IonAvatar>
          <h2>{profileData.name}</h2>
          <p>⭐⭐⭐⭐⭐</p>
        </div>

        {/* Mostrar el nombre del autor de la publicación */}
        <div style={{ textAlign: 'center', paddingTop: '10px' }}>
          <h3>Publicado por: {profileData.authorName}</h3>
        </div>

        <IonItem lines="none">
          <IonIcon icon={mailOutline} slot="start" />
          <IonInput value={profileData.email} readonly />
        </IonItem>

        <IonItem lines="none">
          <IonIcon icon={locationOutline} slot="start" />
          <IonInput value={profileData.location} readonly />
        </IonItem>

        <IonItem lines="none">
          <IonIcon icon={locationOutline} slot="start" />
          <IonInput value={profileData.phone} readonly />
        </IonItem>

        <IonItem lines="none">
          <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
          <IonInput value="Envía un mensaje" readonly />
        </IonItem>

        <IonButton expand="full" color="primary" style={{ marginTop: '20px' }}>
          Enviar un mensaje
        </IonButton>

        <IonButton onClick={() => history.goBack()} className="mx-auto block w-1/2 text-center bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">
          Regresar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PerfilSeguir;
