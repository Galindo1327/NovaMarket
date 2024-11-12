import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from '@ionic/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useHistory } from 'react-router-dom';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { storage, db } from '../credentials'; // Importar Firestore
import logo from '../assets/logoNova.png';

const Perfil = () => {
  const history = useHistory();
  const [editing, setEditing2] = useState(false);
  const [userData2, setUserData2] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
  });

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const userId = 'user_id'; // Sustituye esto con el ID del usuario actual, por ejemplo, obtenido desde Firebase Auth.

  // Función para obtener los datos del usuario desde Firestore
  const fetchUserData2 = async () => {
    try {
      const userDocRef = doc(db, 'users', userId); // Usa el userId correcto
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserData2(docSnap.data()); // Cargar los datos del usuario en el estado
        if (docSnap.data().profileImage) {
          setProfileImage(docSnap.data().profileImage); // Cargar imagen de perfil si está disponible
        }
      } else {
        console.log('No se encontró el documento del usuario');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    fetchUserData2();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData2({
      ...userData2,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profileImages/${userId}_${Date.now()}_${file.name}`); // Agregar ID de usuario y timestamp al nombre del archivo
  
      try {
        // Subir el archivo a Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);
  
        // La referencia de la imagen se obtiene de snapshot.ref
        const downloadURL = await getDownloadURL(snapshot.metadata.ref); // Utilizamos snapshot.metadata.ref
  
        setProfileImage(downloadURL); // Actualiza la imagen en la vista
        console.log("URL de la imagen:", downloadURL);
  
        // Guardar la URL en Firestore
        const userDoc = doc(db, "users", userId); // Cambia "user_id" por el ID del usuario
        await setDoc(userDoc, { profileImage: downloadURL }, { merge: true });
  
        console.log("Imagen guardada exitosamente en Firestore");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };
  

  const saveChanges = async () => {
    try {
      // Guardar los cambios en Firestore
      const userRef = doc(db, 'users', userId); // Asegúrate de usar el ID del usuario correcto
      await setDoc(userRef, userData2, { merge: true }); // Guardar los datos de usuario

      setEditing2(false); // Cambiar el estado de edición
      console.log('Cambios guardados:', userData2);
    } catch (error) {
      console.error('Error guardando los cambios: ', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
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
        <IonToolbar>
          <IonTitle className="text-center">Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              <IonAvatar style={{ margin: '0 auto', width: '120px', height: '120px' }}>
                <img src={profileImage} alt="Avatar del usuario" />
              </IonAvatar>
              {editing && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Usa el método actualizado
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                </div>
              )}
            </IonCol>
          </IonRow>

          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              {editing ? (
                <IonInput
                  value={userData2.nombre}
                  name="nombre"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData2.nombre}</p>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Correo electrónico</IonLabel>
              {editing ? (
                <IonInput
                  value={userData2.email}
                  name="email"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData2.email}</p>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Ciudad</IonLabel>
              {editing ? (
                <IonInput
                  value={userData2.direccion}
                  name="direccion"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData2.direccion}</p>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Teléfono</IonLabel>
              {editing ? (
                <IonInput
                  value={userData2.telefono}
                  name="telefono"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData2.telefono}</p>
              )}
            </IonItem>
          </IonList>

          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="auto">
              {editing ? (
                <IonButton onClick={saveChanges}>Guardar Cambios</IonButton>
              ) : (
                <IonButton onClick={() => setEditing2(true)}>Editar Perfil</IonButton>
              )}
            </IonCol>
          </IonRow>
          <IonButton
            onClick={() => history.goBack()}
            className="mx-auto block w-1/2 text-center bg-blue-800 text-white border border-blue-400 hover:bg-blue-700"
          >
            Regresar
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
