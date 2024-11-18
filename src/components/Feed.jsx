import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonHeader, IonToolbar, IonTitle, IonPopover, IonList, IonItem, IonChip, IonLabel } from '@ionic/react';
import { searchOutline, funnelOutline, closeCircleOutline, personOutline } from 'ionicons/icons';  // Añadir icono de perfil
import { useHistory } from 'react-router-dom';
import Calificacion from './Calificacion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../credentials';
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
    // { id: 1, nombre: 'CARRO', precio: '$23.000.000', tipo: 'vehículo', img: carro },
    // { id: 2, nombre: 'ESTUFA', precio: '$270.000', tipo: 'electrodoméstico', img: estufa },
    // { id: 3, nombre: 'MT-09', precio: '$25.000.000', tipo: 'vehículo', img: mt09 },
    // { id: 4, nombre: 'Chicken Ramen', precio: '$20.950', tipo: 'comida', img: ramen },
    // { id: 5, nombre: 'XTZ 250', precio: '$17.750.000', tipo: 'vehículo', img: xtz },
    // { id: 6, nombre: 'CICLA CAMBIOS', precio: '$225.000', tipo: 'vehículo', img: bike },
    // { id: 13, nombre: 'Refrigerador Samsung RF28R7551', tipo: 'electrodoméstico', precio: '$4.299.900', img: nevera },
    // { id: 14, nombre: 'MacBook Pro 16" M2 Max', tipo: 'tecnología', precio: '$9.999.000', img: macbook },
    // { id: 15, nombre: 'Ducati Panigale V4 S', tipo: 'vehículo', precio: '$129.900.000', img: ducati },
    // { id: 16, nombre: 'Smart TV Samsung Neo QLED 75"', tipo: 'tecnología', precio: '$7.499.900', img: tv },
    // { id: 17, nombre: 'Bicicleta Specialized S-Works Tarmac SL7', tipo: 'vehículo', precio: '$35.900.000', img: bicicleta },
    // { id: 18, nombre: 'Lavadora-Secadora LG WD22VV2S29B', tipo: 'electrodoméstico', precio: '$3.799.900', img: lavadora },
    // { id: 19, nombre: 'iPhone 15 Pro Max 1TB', tipo: 'tecnología', precio: '$7.999.000', img: iphone },
    // { id: 20, nombre: 'BMW R 1250 GS Adventure', tipo: 'vehículo', precio: '$118.900.000', img: bmwMoto },
    // { id: 21, nombre: 'Horno Eléctrico Whirlpool WOS51EC7HS', tipo: 'electrodoméstico', precio: '$2.899.900', img: horno },
    // { id: 22, nombre: 'Cámara Sony Alpha A7R V', tipo: 'tecnología', precio: '$6.999.000', img: sony },
    // { id: 23, nombre: 'Cámara Nikon D5300', tipo: 'tecnología', precio: '$6.500.000', img: nikon },
    // { id: 24, nombre: 'Samsung S24 Plus 1Tb', tipo: 'tecnología', precio: '$9.950.000', img: s24 }
  ];

  const [firebaseProductos, setFirebaseProductos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filtro, setFiltro] = useState('');
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'DetalleProducto'));
        const productosFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          tipo: doc.data().categoria || 'otros',
        }));
        setFirebaseProductos(productosFirebase);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const allProducts = [...productos, ...firebaseProductos];

  const productosFiltrados = allProducts.filter(producto =>
    producto.nombre.toLowerCase().includes(searchText.toLowerCase()) &&
    (filtro === '' || producto.tipo === filtro)
  );

  const handleProductClick = (producto) => {
    history.push('/producto', { producto });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="h-20 flex items-center justify-between">
          <div className="bg-[#0070ff] flex items-center w-full justify-between px-4 rounded-b-lg shadow-md">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-20 h-20" />
              <h1 className="text-white text-xl font-bold text-center ml-5">NovaMarket</h1>
            </div>
            <div className="flex items-center space-x-2">
              <IonButton shape="round" color="light" className="ml-2 text-1xl" onClick={() => history.push('/agregar-producto')}>
                +
              </IonButton>

              <IonButton shape="round" color="light" onClick={() => history.push('/perfil')}>
                <IonIcon icon={personOutline} />
              </IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding bg-[#0070ff]">

        {showPopover && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
        )}
        <div className="flex justify-center items-center mb-4 ">
          <IonInput
            placeholder="Busca tu producto"
            style={{ width: '60%', borderRadius: '20px', backgroundColor: '#e5e5e5', border: '0.5px', marginTop: "10px", color: 'black', textIndent: '15px' }}
            value={searchText}
            onIonInput={(e) => setSearchText(e.target.value)}
          />
          <IonButton shape="round" color="light" className="ml-2" style={{ marginTop: "10px" }}>
            <IonIcon icon={searchOutline} />
          </IonButton>

          <IonButton shape="round" color="light" className="ml-2" style={{ marginTop: "10px" }} onClick={() => setShowPopover(true)}>
            <IonIcon icon={funnelOutline} />
          </IonButton>

          <IonPopover isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}  className="rounded-lg shadow-lg transform -translate-y-60">
            <IonList>
              <IonItem button onClick={() => { setFiltro(''); setShowPopover(false); }}>Todos</IonItem>
              <IonItem button onClick={() => { setFiltro('vehículo'); setShowPopover(false); }}>Vehículos</IonItem>
              <IonItem button onClick={() => { setFiltro('electrodoméstico'); setShowPopover(false); }}>Electrodomésticos</IonItem>
              <IonItem button onClick={() => { setFiltro('comida'); setShowPopover(false); }}>Comida</IonItem>
              <IonItem button onClick={() => { setFiltro('tecnología'); setShowPopover(false); }}>Tecnología</IonItem>
              <IonItem button onClick={() => { setFiltro('jugueteria'); setShowPopover(false); }}>Juguetería</IonItem>
              <IonItem button onClick={() => { setFiltro('aseo'); setShowPopover(false); }}>Aseo</IonItem>
              <IonItem button onClick={() => { setFiltro('comida'); setShowPopover(false); }}>Comida</IonItem>
              <IonItem button onClick={() => { setFiltro('aseo personal'); setShowPopover(false); }}>Aseo Personal</IonItem>
            </IonList>
          </IonPopover>
        </div>

        {filtro && (
          <div className="flex items-center mb-4">
            <IonChip color="tertiary text-black">
              <IonLabel className="text-black">{filtro.charAt(0).toUpperCase() + filtro.slice(1)}</IonLabel>
              <IonIcon icon={closeCircleOutline} onClick={() => setFiltro('')} />
            </IonChip>
          </div>
        )}

        <IonGrid>
          <IonRow className="flex flex-wrap">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                  <IonCol size="6" key={producto.id} className="p-2 flex justify-center">
                    <IonCard 
                      onClick={() => handleProductClick(producto)}
                      className="w-full max-w-xs bg-[#c7dcff] text-black rounded-lg shadow-lg border"
                    >
                      <img 
                        src={producto.img} 
                        alt={producto.nombre} 
                        className="w-full h-40 object-contain p-4"
                      />
                      <IonCardHeader>
                        <IonCardTitle className="text-xl text-center font-bold text-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
                          {producto.nombre}
                        </IonCardTitle>
                        <IonCardSubtitle className="text-lg text-center text-green-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
                          {producto.precio}
                        </IonCardSubtitle>
                      </IonCardHeader>

                      <Calificacion productoId={producto.id} isDetail={false} className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"/>

                    </IonCard>
                  </IonCol>
                )
              )
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500 text-lg">No se encontraron productos con tu búsqueda o filtro</p>
              </div>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};



export default Feed;
