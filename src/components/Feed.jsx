import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonCardContent, IonInput, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { searchOutline, funnelOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import carro from '../assets/carro.jpg';
import estufa from '../assets/estufa.avif';
import mt09 from '../assets/mt09.jpg';
import xtz from '../assets/xtz.jpg';
import ramen from '../assets/ramen.avif';
import bike from '../assets/bike.avif';
import nevera from '../assets/Nevera.jpg';
import macbook from '../assets/Mcbook.webp';
import ducati from '../assets/Ducati.avif';
import tv from '../assets/Tv.png';
import bicicleta from '../assets/Cicla.jpg';
import lavadora from '../assets/LavadoraSec.avif';
import iphone from '../assets/Iphone.jpg';
import bmwMoto from '../assets/Bmw.jpg';
import horno from '../assets/Horno.jpg';
import sony from '../assets/Sony.jpg';
import nikon from '../assets/Nikon.jpg';
import s24 from '../assets/Samsung.png';
import logo from '../assets/logoNova.png';

const Feed = () => {
  const history = useHistory();
  const productos = [
    { id: 1, nombre: 'CARRO', precio: '$23.000.000', img: carro },
    { id: 2, nombre: 'ESTUFA', precio: '$270.000', img: estufa },
    { id: 3, nombre: 'MT-09', precio: '$25.000.000', img: mt09 },
    { id: 4, nombre: 'Chicken Ramen', precio: '$20.950', img: ramen },
    { id: 5, nombre: 'XTZ 250', precio: '$17.750.000', img: xtz },
    { id: 6, nombre: 'CICLA CAMBIOS', precio: '$225.000', img: bike },
    { id: 13, nombre: 'Refrigerador Samsung RF28R7551', precio: '$4.299.900', img: nevera },
    { id: 14, nombre: 'MacBook Pro 16" M2 Max', precio: '$9.999.000', img: macbook },
    { id: 15, nombre: 'Ducati Panigale V4 S', precio: '$129.900.000', img: ducati },
    { id: 16, nombre: 'Smart TV Samsung Neo QLED 75"', precio: '$7.499.900', img: tv },
    { id: 17, nombre: 'Bicicleta Specialized S-Works Tarmac SL7', precio: '$35.900.000', img: bicicleta },
    { id: 18, nombre: 'Lavadora-Secadora LG WD22VV2S29B', precio: '$3.799.900', img: lavadora },
    { id: 19, nombre: 'iPhone 15 Pro Max 1TB', precio: '$7.999.000', img: iphone },
    { id: 20, nombre: 'BMW R 1250 GS Adventure', precio: '$118.900.000', img: bmwMoto },
    { id: 21, nombre: 'Horno Eléctrico Whirlpool WOS51EC7HS', precio: '$2.899.900', img: horno },
    { id: 22, nombre: 'Cámara Sony Alpha A7R V', precio: '$6.999.000', img: sony },
    { id: 23, nombre: 'Cámara Nikon D5300', precio: '$6.500.000', img: nikon },
    { id: 24, nombre: 'Samsung S24 Plus 1Tb', precio: '$9.950.000', img: s24 }
  ];

  const handleProductClick = (producto) => {
    history.push('/producto', { producto });
  };

  return (
    <IonPage>
      {/* Barra de navegación */}
      <IonHeader>
        <IonToolbar className=" h-20 flex items-center ">
          <div className="flex bg-blue-800 items-center">
            <IonTitle className="text-white text-4xl font-bold text-center ">NovaMarket</IonTitle>
            <img src={logo} alt="Logo" className="w-36 h-22 px-8" />
          </div>
        </IonToolbar>
      </IonHeader>

      {/* Contenido del Feed */}
      <IonContent className="bg-gray-100">
        {/* Barra de búsqueda */}
        <div className="bg-blue-800 flex justify-center items-center p-4" >
          <IonInput
            placeholder="     Buscar aquí"
            className="text-white font-bold w-3/4 m-5 rounded-full border-4 border-gray-300 p-4"
          ></IonInput>
          <IonButton className="rounded-full mx-2 bg-white text-white">
            <IonIcon icon={searchOutline} />
          </IonButton>
          <IonButton className="rounded-full bg-white text-white">
            <IonIcon icon={funnelOutline} />
          </IonButton>
        </div>

        {/* Grid de productos */}
        <IonGrid>
          <IonRow className="flex flex-wrap">
            {productos.map((producto) => (
              <IonCol size="6" key={producto.id} className="p-2 flex justify-center">
                <IonCard
                  onClick={() => handleProductClick(producto)}
                  className="w-full max-w-xs bg-white rounded-lg shadow-lg"
                >
                  <img
                    src={producto.img}
                    alt={producto.nombre}
                    className="w-full h-40 object-contain p-4"
                  />
                  <IonCardHeader>
                    <IonCardTitle className="text-xl font-bold text-gray-800">{producto.nombre}</IonCardTitle>
                    <IonCardSubtitle className="text-lg text-red-500">{producto.precio}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
