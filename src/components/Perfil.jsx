import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonInput, IonLabel, IonItem, IonList, IonGrid, IonRow, IonCol, IonAvatar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logoNova.png';

const Perfil = () => {
  const history = useHistory();  // Hook de React Router para redireccionar
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: 'John Doe',
    email: 'john.doe@example.com',
    direccion: '123 Calle Falsa',
    telefono: '1234567890',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const saveChanges = () => {
    setEditing(false);
    console.log('Cambios guardados:', userData);
  };

  // Función para redirigir a otra vista
  const PerfilSeguir = () => {
    history.push('/perfil-seguir');  // Redirige a la ruta /otra-vista
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
          <IonTitle className="text-center"  >Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              <IonAvatar style={{ margin: '0 auto', width: '120px', height: '120px' }}>
                <img src="https://via.placeholder.com/150" alt="Avatar del usuario" />
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              {editing ? (
                <IonInput
                  value={userData.nombre}
                  name="nombre"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData.nombre}</p>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Correo electrónico</IonLabel>
              {editing ? (
                <IonInput
                  value={userData.email}
                  name="email"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Ciudad</IonLabel>
              {editing ? (
                <IonInput
                  value={userData.direccion}
                  name="direccion"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData.direccion}</p>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Teléfono</IonLabel>
              {editing ? (
                <IonInput
                  value={userData.telefono}
                  name="telefono"
                  onIonInput={handleInputChange}
                />
              ) : (
                <p>{userData.telefono}</p>
              )}
            </IonItem>
          </IonList>

          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="auto">
              {editing ? (
                <IonButton onClick={saveChanges}>Guardar Cambios</IonButton>
              ) : (
                <IonButton onClick={() => setEditing(true)}>Editar Perfil</IonButton>
              )}
            </IonCol>
            <IonCol size="auto">
              {/* Botón para redirigir a otra vista */}
              <IonButton onClick={PerfilSeguir}>Vista de seguidor</IonButton>
            </IonCol>
          </IonRow>
          <IonButton onClick={() => history.goBack()} className="mx-auto block w-1/2 text-center bg-blue-800 text-white border border-blue-400 hover:bg-blue-700">Regresar</IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
