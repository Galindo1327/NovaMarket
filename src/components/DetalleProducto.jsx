import React, { useState, useEffect } from 'react';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonButton, IonPage, IonContent, IonLabel
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../credentials'; 
import logo from '../assets/logoNova.png'; 
import Calificacion from '../components/Calificacion'; 

const DetalleProducto = () => {
  const location = useLocation();
  const history = useHistory();
  const { producto } = location.state || { producto: {} };

  const [reviews, setReviews] = useState([]); 
  const [averageRating, setAverageRating] = useState(0); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (producto && producto.id) {
      const q = query(collection(db, 'calificaciones'), where('productoId', '==', producto.id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedReviews = querySnapshot.docs.map(doc => doc.data());
        setReviews(fetchedReviews);

        const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
        const average = fetchedReviews.length > 0 ? totalRating / fetchedReviews.length : 0;
        setAverageRating(average);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [producto]);

  const handleNewRating = (newRating) => {
    setReviews(prevReviews => [...prevReviews, newRating]);
    const totalRating = [...reviews, newRating].reduce((acc, review) => acc + review.rating, 0);
    const average = totalRating / ([...reviews, newRating].length || 1);
    setAverageRating(average);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!producto || !producto.id) {
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
      <div className="bg-[#0070ff] py-5 text-white relative flex items-center justify-between">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-24 p-2  sm:w-36 md:w-38 lg:w-46 xl:w-50 max-w-full ml-4" 
        />
        <h1 className="absolute ml-14 inset-0 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
          <a 
            href="/feed" 
            className="text-white hover:underline cursor-pointer"
          >
            NovaMarket
          </a>
        </h1>

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
            <IonButton onClick={() => history.push('/perfil-seguir', { usuarioId: producto.usuarioID })} className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">{producto.usuario}</IonButton>
            
          </IonCardContent>

          <Calificacion productoId={producto.id} isDetail={true} />

          <div className="flex justify-around mb-5">
            <IonButton
              onClick={() => {
                history.goBack();
              }}
              className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700"
              >
              Regresar
            </IonButton>
            <IonButton onClick={() => history.push('/chat', { productoId: producto.id })} className="w-1/2 bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">Contactar</IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;