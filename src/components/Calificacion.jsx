import React, { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonInput } from '@ionic/react';
import StarRatings from 'react-star-ratings';
import { db } from '../credentials'; // Importar Firestore
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Métodos de Firestore

const Calificacion = ({ productoId, isDetail = false }) => {
  // Estados para rating y comentarios
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0); // Promedio de calificación
  const [totalComments, setTotalComments] = useState(0); // Total de comentarios
  const [isLoading, setIsLoading] = useState(true); // Estado para cargar datos
  const [areCommentsVisible, setAreCommentsVisible] = useState(false); // Control de visibilidad de comentarios
  const [reviews, setReviews] = useState([]); // Almacenar los comentarios obtenidos

  // Obtener todas las calificaciones de un producto
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
        fetchedReviews.push(data); // Agregar comentarios obtenidos
      });

      if (totalRatings > 0) {
        setAverageRating(ratingSum / totalRatings);
        setTotalComments(totalRatings);
        setReviews(fetchedReviews); // Almacenar comentarios
      }
    } catch (e) {
      console.error('Error fetching ratings: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar calificaciones al montar el componente
  useEffect(() => {
    fetchRatings();
  }, [productoId]);

  // Enviar una nueva calificación
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

      // Reiniciar campos después de enviar
      setRating(0);
      setComment('');
      // Refrescar las calificaciones
      fetchRatings();
    } catch (e) {
      console.error('Error al guardar la calificación: ', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alternar visibilidad de comentarios
  const toggleCommentsVisibility = () => {
    setAreCommentsVisible(!areCommentsVisible);
  };

  // Si estamos en el feed, solo mostramos estrellas y total de comentarios
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

  // Si estamos en el detalle del producto, mostramos el formulario completo de calificación
  return (
    <IonCard className="p-6 mt-6">
      <IonCardHeader>
        <IonCardTitle className="text-3xl font-bold text-orange-500 text-center mb-4">
          Califica este producto
        </IonCardTitle>
      </IonCardHeader>

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

      {/* Botón para mostrar/ocultar los comentarios */}
      <IonButton
        onClick={toggleCommentsVisibility}
        expand="full"
        className="mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {areCommentsVisible ? 'Ocultar comentarios' : `Mostrar comentarios (${totalComments})`}
      </IonButton>

      {/* Lista de comentarios desplegable */}
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
    </IonCard>
  );
};

export default Calificacion;
