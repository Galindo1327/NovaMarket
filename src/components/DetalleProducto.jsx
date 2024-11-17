import React, { useState, useEffect } from 'react';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonButton, IonPage, IonContent, IonLabel
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Suscripción en tiempo real
import { db } from '../credentials'; // Firestore
import logo from '../assets/logoNova.png'; 
import Calificacion from '../components/Calificacion'; 

const DetalleProducto = () => {
  const location = useLocation();
  const history = useHistory();
  const { producto } = location.state || { producto: {} };

  const [reviews, setReviews] = useState([]); // Estado para guardar las reviews
  const [averageRating, setAverageRating] = useState(0); // Estado para la calificación promedio


  useEffect(() => {
    if (producto && producto.id) {
      // Escuchar cambios en tiempo real en las calificaciones
      const q = query(collection(db, 'calificaciones'), where('productoId', '==', producto.id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedReviews = querySnapshot.docs.map(doc => doc.data());
        setReviews(fetchedReviews);

        // Calcular el promedio de calificaciones
        const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
        const average = fetchedReviews.length > 0 ? totalRating / fetchedReviews.length : 0;
        setAverageRating(average);
      });

      // Limpiar suscripción al desmontar el componente
      return () => unsubscribe();
    }
  }, [producto.id]);

  const handleNewRating = (newRating) => {
    setReviews(prevReviews => [...prevReviews, newRating]); // Actualizar el historial de calificaciones
    const totalRating = [...reviews, newRating].reduce((acc, review) => acc + review.rating, 0);
    const average = totalRating / ([...reviews, newRating].length || 1);
    setAverageRating(average); // Actualizar el promedio
  };

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  const renderAverageStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-3xl ${i <= averageRating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <IonPage>
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

      <IonContent className="p-4">
        <IonCard className="text-center border-2 border-blue-400 rounded-lg">
          <img
            src={producto.img}
            alt={producto.nombre}
            className="w-full h-80 object-contain border-b-2 border-blue-400"
          />
          
          <IonCardHeader>
            <IonCardTitle className="text-3xl text-gray-800 font-bold">{producto.nombre}</IonCardTitle>
            <IonCardSubtitle className="text-2xl text-orange-500 mt-1">{producto.precio}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonLabel className="block mb-2 text-gray-600">Descripción:</IonLabel>
            <div className="border border-gray-300 p-2 rounded bg-gray-100 text-gray-700 mb-5">
              {producto.detalles}
            </div>
            <IonLabel className="block mb-2 text-gray-600">Vendedor:</IonLabel>
            <IonButton onClick={() => history.push('/perfil-seguir')} className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">{producto.usuario}</IonButton>
            
          </IonCardContent>

          <Calificacion productoId={producto.id} isDetail={true} />


          <div className="flex justify-around mb-5">
            <IonButton
              onClick={() => {
                history.goBack(); // Regresa a la página anterior (feed)
                 // Le damos un pequeño retraso para asegurarnos que el cambio de página se complete antes de recargar
              }}
              className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700"
              >
              Regresar
            </IonButton>
            <IonButton onClick={() => history.push('/chat')} className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">Contactar</IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;
