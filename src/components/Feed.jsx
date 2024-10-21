import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonHeader, IonToolbar, IonTitle, IonPopover, IonList, IonItem, IonChip, IonLabel } from '@ionic/react';
import { searchOutline, funnelOutline, closeCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Calificacion from './Calificacion';
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
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Importar Firestore

const Feed = () => {
  const history = useHistory();
  const productos = [
    { id: 1, nombre: 'CARRO', precio: '$23.000.000', tipo: 'vehículo', img: carro },
    { id: 2, nombre: 'ESTUFA', precio: '$270.000', tipo: 'electrodoméstico', img: estufa },
    { id: 3, nombre: 'MT-09', precio: '$25.000.000', tipo: 'vehículo', img: mt09 },
    { id: 4, nombre: 'Chicken Ramen', precio: '$20.950', tipo: 'comida', img: ramen },
    { id: 5, nombre: 'XTZ 250', precio: '$17.750.000', tipo: 'vehículo', img: xtz },
    { id: 6, nombre: 'CICLA CAMBIOS', precio: '$225.000', tipo: 'vehículo', img: bike },
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

  // Estado para el texto de búsqueda
  const [searchText, setSearchText] = useState('');
  
  // Estado para el filtro
  const [filtro, setFiltro] = useState('');
  
  // Estado para manejar el popover de filtros
  const [showPopover, setShowPopover] = useState(false);


  // Filtrar productos según el texto de búsqueda y el filtro
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchText.toLowerCase()) &&
    (filtro === '' || producto.tipo === filtro)
  );

 const handleProductClick = (producto) => {
    history.push('/producto', { producto });
  };


  return (
    <IonPage>
    {/* Barra de navegación */}
<IonHeader>
  <IonToolbar className="h-20 flex items-center">
    <div className="bg-blue-800 flex items-center w-full justify-between px-4">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-20 h-20" />
        <IonTitle className="text-white text-2xl font-bold">NovaMarket</IonTitle>
      </div>
      <IonButton
        shape="round"
        color="light"
        className="ml-2 text-3xl"
        onClick={() => history.push('/agregar-producto')}
      >
        +
      </IonButton>
    </div>
  </IonToolbar>
</IonHeader>






      {/* Contenido del Feed */}
      <IonContent className="ion-padding" style={{ backgroundColor: '#ffffff' }}>

        {/* Barra de búsqueda */}
        <div className="flex justify-center items-center mb-4">
          <IonInput 
            placeholder="Busca tu producto" 
            style={{ width: '60%', borderRadius: '20px', backgroundColor: 'white', border: '0.5px solid #ccc', 
              marginTop: "10px", color: 'black',
              textIndent: '15px' }} 
            value={searchText}
            onIonInput={(e) => setSearchText(e.target.value)} // Actualiza el texto de búsqueda
          />
          <IonButton shape="round" color="light" className='ml-2' style={{marginTop: "10px"}}>
            <IonIcon icon={searchOutline} />
          </IonButton>

          {/* Botón para mostrar el popover de filtros */}
          <IonButton shape="round" color="light" className='ml-2' style={{marginTop: "10px"}} onClick={() => setShowPopover(true)}>
            <IonIcon icon={funnelOutline} />
          </IonButton>

          {/* Popover con las opciones de filtrado */}
          <IonPopover
            isOpen={showPopover}
            onDidDismiss={() => setShowPopover(false)}
          >
            <IonList>
              <IonItem button onClick={() => { setFiltro(''); setShowPopover(false); }}>Todos</IonItem>
              <IonItem button onClick={() => { setFiltro('vehículo'); setShowPopover(false); }}>Vehículos</IonItem>
              <IonItem button onClick={() => { setFiltro('electrodoméstico'); setShowPopover(false); }}>Electrodomésticos</IonItem>
              <IonItem button onClick={() => { setFiltro('comida'); setShowPopover(false); }}>Comida</IonItem>
            </IonList>
          </IonPopover>
        </div>

        {/* Mostrar el filtro activo */}
        {filtro && (
          <div className="flex items-center mb-4">
            <IonChip color="primary">
              <IonLabel>{filtro.charAt(0).toUpperCase() + filtro.slice(1)}</IonLabel>
              <IonIcon icon={closeCircleOutline} onClick={() => setFiltro('')} />
            </IonChip>
          </div>
        )}
      
        {/* Grid de productos */}
        <IonGrid>
          <IonRow className="flex flex-wrap">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
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
                        <IonCardTitle className="text-xl font-bold text-gray-800">
                          {producto.nombre}
                        </IonCardTitle>
                        <IonCardSubtitle className="text-lg text-red-500">
                          {producto.precio}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      
                      {/* Mostrar solo las estrellas y el número de comentarios */}
                      <Calificacion productoId={producto.id} isDetail={false} />

                    </IonCard>
                  </IonCol>
                )
              )
            ) : (
              <p>No se encontraron productos</p> // Mensaje cuando no se encuentra nada
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
