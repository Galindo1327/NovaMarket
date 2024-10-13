import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const AddProduct = ({ onAddProduct }) => {
  const history = useHistory();
  const [product, setProduct] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    detalles: '',
    estado: '',
    img: ''
  });

  const handleInputChange = (e, field) => {
    setProduct({ ...product, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, img: URL.createObjectURL(file) }); // Para mostrar la imagen seleccionada
    }
  };

const handleSubmit = () => {
  if (typeof onAddProduct === 'function') {
    const newProduct = { ...product, id: Date.now() }; // Agregar ID único al producto
    onAddProduct(newProduct); // Llama a la función para agregar el producto
    history.push('/feed'); // Redirige de nuevo al feed

    // Limpiar los campos después de agregar
    setProduct({
      nombre: '',
      precio: '',
      categoria: '',
      detalles: '',
      estado: '',
      img: ''
    });
  } else {
    console.error('onAddProduct no es una función');
  }
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center">Agregar Producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="max-w-md mx-auto">
          {/* Campos del formulario */}
          <IonItem>
            <IonLabel className="text-left" position="floating">Nombre del producto</IonLabel>
            <IonInput
              className="mt-2" // Añadir margen superior
              value={product.nombre}
              onIonInput={(e) => handleInputChange(e, 'nombre')}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel className="text-left" position="floating">Precio</IonLabel>
            <IonInput
              className="mt-2" 
              type="number"
              value={product.precio}
              onIonInput={(e) => handleInputChange(e, 'precio')}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel className="text-left">Categoría</IonLabel>
            <IonSelect
              value={product.categoria}
              onIonChange={(e) => setProduct({ ...product, categoria: e.detail.value })}
              required
            >
              <IonSelectOption value="vehículo">Vehículo</IonSelectOption>
              <IonSelectOption value="electrodoméstico">Electrodoméstico</IonSelectOption>
              <IonSelectOption value="comida">Comida</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
        <IonLabel className="text-left" position="floating">Descripción del producto</IonLabel>
        <IonTextarea
            className="mt-2 w-[90%]" 
            value={product.detalles}
            onIonInput={(e) => handleInputChange(e, 'detalles')}
            required
        />
        </IonItem>


          <IonItem>
            <IonLabel className="text-left">Estado</IonLabel>
            <IonSelect
              value={product.estado}
              onIonChange={(e) => setProduct({ ...product, estado: e.detail.value })}
              required
            >
              <IonSelectOption value="nuevo">Nuevo</IonSelectOption>
              <IonSelectOption value="como nuevo">Usado (Como nuevo)</IonSelectOption>
              <IonSelectOption value="buen estado">Usado (Buen estado)</IonSelectOption>
              <IonSelectOption value="aceptable">Usado (Aceptable)</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel className="text-left">Seleccionar imagen</IonLabel>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" 
                required
            />
            <button
                onClick={() => document.querySelector('input[type="file"]').click()} 
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
            >
                Seleccionar archivo
            </button>
        </IonItem>

          <IonButton
            expand="block"
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Subir Producto
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddProduct;
