import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { storage, db } from '../credentials';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = ({ onAddProduct }) => {
  const history = useHistory();
  const [product, setProduct] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    detalles: '',
    estado: '',
    img: null
  });

  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e, field) => {
    setProduct({ ...product, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, img: file });
    }
  };

  const handleSubmit = async () => {
    if (product.img) {
      setUploading(true);
      const imgRef = ref(storage, `productos/${Date.now()}-${product.img.name}`);
      await uploadBytes(imgRef, product.img);
      const imgUrl = await getDownloadURL(imgRef);

      const newProduct = {
        nombre: product.nombre,
        precio: product.precio,
        categoria: product.categoria,
        detalles: product.detalles,
        estado: product.estado,
        img: imgUrl,
      };
  
      await addDoc(collection(db, 'DetalleProducto'), newProduct);
  
      if (onAddProduct) {
        onAddProduct(newProduct);
      }

      setUploading(false);
      history.push('/feed');
    } else {
      console.error('Debes seleccionar una imagen');
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
              className="mt-2"
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
            disabled={uploading}  
          >
            {uploading ? 'Subiendo...' : 'Subir Producto'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddProduct;