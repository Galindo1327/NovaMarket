import React, { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonInput } from '@ionic/react';
import StarRatings from 'react-star-ratings';
import { db } from '../credentials';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Calificacion = ({ productoId, isDetail = false }) => {
  // Estados para rating y comentarios
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0); 
  const [totalComments, setTotalComments] = useState(0); 
  const [isLoading, setIsLoading] = useState(true); 
  const [areCommentsVisible, setAreCommentsVisible] = useState(false); 
  const [reviews, setReviews] = useState([]); 

  const fetchRatings = async () => {
    try {
      const q = query(collection(db, 'calificaciones'), where('productoId', '==', productoId));
      const querySnapshot = await getDocs(q);

      let totalRatings = 0;
      let ratingSum = 0;
      let fetchedReviews = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        ratingSum += data.rating;
        totalRatings++;
        fetchedReviews.push(data); 
      });

      if (totalRatings > 0) {
        setAverageRating(ratingSum / totalRatings);
        setTotalComments(totalRatings);
        setReviews(fetchedReviews); 
      }
    } catch (e) {
      console.error('Error fetching ratings: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [productoId]);

  const handleSubmit = async () => {
    if (!productoId || rating === 0 || comment === '') {
      alert('Por favor completa la calificación y el comentario.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'calificaciones'), {
        productoId,
        rating,
        comment,
        timestamp: new Date()
      });

      console.log('Calificación guardada exitosamente');

      setRating(0);
      setComment('');
      fetchRatings();
    } catch (e) {
      console.error('Error al guardar la calificación: ', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCommentsVisibility = () => {
    setAreCommentsVisible(!areCommentsVisible);
  };

  if (!isDetail) {
    return (
      <div className="text-center mt-2">
        {!isLoading ? (
          <>
            <StarRatings
              rating={averageRating}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
              name="rating"
            />
            <p className="text-gray-600 text-sm">{totalComments} comentarios</p>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    );
  }

  return (
    <IonCard className="p-6 mt-6">
      <IonCardHeader>
        <IonCardTitle className="text-3xl font-bold text-orange-500 text-center mb-4">
          Calificación
        </IonCardTitle>
      </IonCardHeader>

      <div className="text-center mb-4">
        <StarRatings
          rating={averageRating}
          starRatedColor="gold"
          numberOfStars={5}
          starDimension="40px"
          starSpacing="5px"
        />
      </div>

      <IonButton
        onClick={toggleCommentsVisibility}
        expand="full"
        className="mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {areCommentsVisible ? 'Ocultar comentarios' : `Mostrar comentarios (${totalComments})`}
      </IonButton>

      {areCommentsVisible && (
        <div className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <StarRatings
                rating={review.rating}
                starRatedColor="gold"
                numberOfStars={5}
                name={`rating-${index}`}
                starDimension="20px"
                starSpacing="3px"
              />
              <p className="mt-2 text-gray-700">
                <strong>Comentario:</strong> {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-orange-500 text-center mt-6 mb-4">Califica este producto</h2>
      <div className="mt-4">
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          changeRating={(newRating) => setRating(newRating)}
          numberOfStars={5}
          name="rating"
          starDimension="40px"
          starSpacing="5px"
        />
        <IonInput
          placeholder="Escribe tu comentario aquí"
          value={comment}
          onIonInput={(e) => setComment(e.detail.value)}
        />
        <IonButton
          onClick={handleSubmit}
          expand="full"
          className="mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Calificación'}
        </IonButton>
      </div>
    </IonCard>
  );
};

export default Calificacion;
