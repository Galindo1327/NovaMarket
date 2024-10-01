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
const Feed = () => {
  // Definimos los productos a mostrar
  const history = useHistory();
  const productos = [
    { id: 1, nombre: 'CARRO', precio: '$23.000.000', img: carro },
    { id: 2, nombre: 'ESTUFA', precio: '$270.000', img: estufa },
    { id: 3, nombre: 'MT-09', precio: '$25.000.000', img: mt09 },
    { id: 4, nombre: 'Chicken Ramen', precio: '$20.950', img: ramen },
    { id: 5, nombre: 'XTZ 250', precio: '$17.750.000', img: xtz },
    { id: 6, nombre: 'CICLA CAMBIOS', precio: '$225.000', img: bike },
    { id: 7, nombre: 'CARRO', precio: '$23.000.000', img: carro },
    { id: 8, nombre: 'ESTUFA', precio: '$270.000', img: estufa },
    { id: 9, nombre: 'MT-09', precio: '$25.000.000', img: mt09 },
    { id: 10, nombre: 'Chicken Ramen', precio: '$20.950', img: ramen },
    { id: 11, nombre: 'XTZ 250', precio: '$17.750.000', img: xtz },
    { id: 12, nombre: 'CICLA CAMBIOS', precio: '$225.000', img: bike }
  ];

  const handleProductClick = (producto) => {
    history.push('/producto', { producto });
  };


  return (
    <IonPage>
      {/* Barra de navegación */}
      <IonHeader>
        <IonToolbar style={{ backgroundColor: '#3b82f6' }}>
          <IonTitle className='text-white'>NovaMarket</IonTitle>
          {/* Logo personalizado */}
          <img src="assets/carro.jpg" alt="Logo" style={{ width: '40px', position: 'absolute', right: '10px', top: '5px' }} />
        </IonToolbar>
      </IonHeader>

      {/* Contenido del Feed */}
      <IonContent className="ion-padding" style={{ backgroundColor: '#ffffff' }}>
        {/* Barra de búsqueda */}
        <div className="flex justify-center items-center mb-4">
          <IonInput placeholder="Search here" style={{ width: '60%', borderRadius: '20px', backgroundColor: 'white', border: '1px solid #ccc', padding: '8px 16px', color: 'black' }}></IonInput>
          <IonButton shape="round" color="light" className='ml-2'>
            <IonIcon icon={searchOutline} />
          </IonButton>
          <IonButton shape="round" color="light" className='ml-2'>
            <IonIcon icon={funnelOutline} />
          </IonButton>
        </div>

        {/* Grid de productos */}
        <IonGrid>
          <IonRow>
            {productos.map((producto) => (
              <IonCol size="6" key={producto.id} className="ion-align-self-center">
               <IonCard onClick={() => handleProductClick(producto)}>
                  <img src={producto.img} alt={producto.nombre} style={{ width: '100px', height: '100px', margin: 'auto' }} />
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '1em' }}>{producto.nombre}</IonCardTitle>
                    <IonCardSubtitle style={{ fontSize: '0.9em' }}>{producto.precio}</IonCardSubtitle>
                    
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
