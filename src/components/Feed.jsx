import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonHeader, IonToolbar, IonTitle, IonPopover, IonList, IonItem, IonChip, IonLabel } from '@ionic/react';
import { searchOutline, funnelOutline, closeCircleOutline } from 'ionicons/icons';
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
    { id: 1, nombre: 'CARRO', precio: '$23.000.000', tipo: 'vehículo', img: carro },
    { id: 2, nombre: 'ESTUFA', precio: '$270.000', tipo: 'electrodoméstico', img: estufa },
    { id: 3, nombre: 'MT-09', precio: '$25.000.000', tipo: 'vehículo', img: mt09 },
    { id: 4, nombre: 'Chicken Ramen', precio: '$20.950', tipo: 'comida', img: ramen },
    { id: 5, nombre: 'XTZ 250', precio: '$17.750.000', tipo: 'vehículo', img: xtz },
    { id: 6, nombre: 'CICLA CAMBIOS', precio: '$225.000', tipo: 'vehículo', img: bike },
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
          <IonRow>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <IonCol size="6" key={producto.id} className="ion-align-self-center">
                  <IonCard onClick={() => handleProductClick(producto)}>
                    <img src={producto.img} alt={producto.nombre} style={{ width: '100px', height: '100px', margin: 'auto',   }} />
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1em' }}>{producto.nombre}</IonCardTitle>
                      <IonCardSubtitle style={{ fontSize: '0.9em' }}>{producto.precio}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))
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
