import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Feed from '../components/Feed';

const Home = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense"> 
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Feed />
      </IonContent>
    </IonPage>
  );
};

export default Home;
