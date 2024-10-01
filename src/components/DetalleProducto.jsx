import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonPage, IonContent } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';

const DetalleProducto = () => {
  const location = useLocation();
  const history = useHistory();
  
  // Asumiendo que la información del producto se pasa a través del estado de la navegación
  const { producto } = location.state || { producto: {} };

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonCard>
          <img src={producto.img} alt={producto.nombre} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <IonCardHeader>
            <IonCardTitle>{producto.nombre}</IonCardTitle>
            <IonCardSubtitle>{producto.precio}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Detalles del producto...</p>
            
          </IonCardContent>
          <IonButton onClick={() => history.goBack()}>Regresar</IonButton>
          <IonButton onClick={() => history.push('/chat')}>Chatear con el Vendedor</IonButton>
        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;
