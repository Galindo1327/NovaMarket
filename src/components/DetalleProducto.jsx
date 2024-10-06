import React from 'react';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonButton, IonPage, IonContent, IonLabel
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logoNova.png'; 
import './DetalleProducto.css';

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
      {/* Sección superior con fondo azul, logo y título */}
      <div className="header-toolbar">
        <h1 className="titulo-novamarket">NovaMarket</h1>
        <br />
        <div className="usuario-container"> 
          <p className="nombre-usuario">Juan Carlos</p>
        </div>
        
        <img src={logo} alt="Logo" className="logo-novamarket" />
      </div>


      <IonContent className="ion-padding">
        <IonCard className="product-card">
          {/* Imagen del producto */}
          <img
            src={producto.img}
            alt={producto.nombre}
            className="product-image"
          />
          
          {/* Información del producto */}
          <IonCardHeader>
            <IonCardTitle className="product-title">{producto.nombre}</IonCardTitle>
            <IonCardSubtitle className="product-price">{producto.precio}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {/* Cuadro de descripción */}
            <IonLabel className="description-label">Descripción:</IonLabel>
            <div className="description-placeholder">
              {producto.descripcion || "Este es un placeholder para la descripción del producto."}
            </div>
          </IonCardContent>

          {/* Botones Regresar y Chatear */}
          <div className="button-container">
            <IonButton onClick={() => history.goBack()} className="btn-regresar">Regresar</IonButton>
            <IonButton onClick={() => history.push('/chat')} className="btn-chatear">Chatear con el Vendedor</IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;