import React from 'react';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonButton, IonPage, IonContent, IonLabel
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logoNova.png'; 

const DetalleProducto = () => {
  const location = useLocation();
  const history = useHistory();
  const { producto } = location.state || { producto: {} };

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <IonPage>
      <div className="bg-blue-800 py-5 text-center text-white relative">
        <h1 className="text-4xl font-bold mb-2">NovaMarket</h1>
        <div className="mt-2">
          <p className="text-2xl">Juan Carlos</p>
        </div>
        
        <img src={logo} alt="Logo" className="absolute right-5 top-5 w-24" />
      </div>

      <IonContent className="p-4">
        <IonCard className="text-center border-2 border-blue-400 rounded-lg">
          <img
            src={producto.img}
            alt={producto.nombre}
            className="w-full h-80 object-contain border-b-2 border-blue-400"
          />
          
          <IonCardHeader>
            <IonCardTitle className="text-2xl text-gray-800 font-bold">{producto.nombre}</IonCardTitle>
            <IonCardSubtitle className="text-xl text-orange-500 mt-1">{producto.precio}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonLabel className="block mb-2 text-gray-600">Descripción:</IonLabel>
            <div className="border border-gray-300 p-2 rounded bg-gray-100 text-gray-700 mb-5">
              {producto.descripcion || "Este es un placeholder para la descripción del producto."}
            </div>
          </IonCardContent>

          <div className="flex justify-around mb-5">
            <IonButton onClick={() => history.goBack()} className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">Regresar</IonButton>
            <IonButton onClick={() => history.push('/chat')} className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">Chatear con el Vendedor</IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;
