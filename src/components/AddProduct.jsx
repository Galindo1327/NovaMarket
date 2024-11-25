import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { storage, db, auth } from '../credentials';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import logo from '../assets/logoNova.png';
import { useAuth } from "../context/authContext";

const AddProduct = ({ onAddProduct }) => {
  const history = useHistory();
  const { getUserInfo } = useAuth();
  const [product, setProduct] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    detalles: '',
    estado: '',
    img: null
  });

  const [uploading, setUploading] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [usuarioID, setUsuarioID] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        setUsuario(user.displayName || "Usuario");
        setUsuarioID(user.uid);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e, field) => {
    setProduct({ ...product, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, img: file });
      setImageSelected(true);

      // Mostrar imagen subida
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewElement = document.getElementById('image-preview');
        if (previewElement) {
          previewElement.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.img) {
      setUploading(true);

      try {
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
          usuario: usuario,
          usuarioID: usuarioID,
        };

        await addDoc(collection(db, 'DetalleProducto'), newProduct);

        if (onAddProduct) {
          onAddProduct(newProduct);
        }

        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          history.replace('/feed');
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error al subir el producto:", error);
      } finally {
        setUploading(false);
      }
    } else {
      console.error('Debes seleccionar una imagen');
    }
  };

  const styles = {
    successBox: {
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#007BFF',
      border: '2px solid #ADD8E6',
      borderRadius: '10px',
      padding: '20px',
      zIndex: 1000,
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    successText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: '16px',
    },
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="bg-[#0070ff] py-5 text-white relative flex items-center justify-between rounded-b-lg">
          <img
            src={logo}
            alt="Logo"
            className="w-24 p-2 sm:w-36 md:w-38 lg:w-46 xl:w-50 max-w-full ml-4"
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
        <IonToolbar>
          <IonTitle className="text-center">Agregar Producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding flex justify-center">
        <div className="max-w-md mx-auto flex justify-center flex-col">
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel className="text-left" position="floating">Nombre del producto</IonLabel>
              <IonInput
                className="mt-4"
                value={product.nombre}
                onIonInput={(e) => handleInputChange(e, 'nombre')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel className="text-left" position="floating">Precio</IonLabel>
              <IonInput
                className="mt-4"
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
                <IonSelectOption value="tecnología">Tecnología</IonSelectOption>
                <IonSelectOption value="Aseo">Aseo</IonSelectOption>
                <IonSelectOption value="jugueteria">Juguetería</IonSelectOption>
                <IonSelectOption value="Cuidado Personal">Cuidado Personal</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel className="text-left" position="floating">Descripción del producto</IonLabel>
              <IonTextarea
                className="mt-4"
                value={product.detalles}
                onIonInput={(e) => handleInputChange(e, 'detalles')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel className="text-left mt-4">Estado</IonLabel>
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
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="mt-2 bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
              >
                {imageSelected ? "Imagen seleccionada" : "Seleccionar archivo"}
              </button>
            </IonItem>
            <div className="mt-4">
              {product.img && (
                <img
                  id="image-preview"
                  alt="Vista previa de la imagen"
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>

            <div className='flex flex-col justify-center items-center mt-9'>
              <IonButton
                expand="block"
                type="submit"
                className="w-1/2 text-white hover:bg-blue-700"
                disabled={uploading}
              >
                {uploading ? 'Subiendo...' : 'Subir Producto'}
              </IonButton>
              <IonButton expand="block" onClick={() => history.goBack()} className="w-1/2 text-white hover:bg-blue-700">Regresar</IonButton>
            </div>
          </form>
        </div>
      </IonContent>
      {successMessage && (
        <div style={styles.successBox}>
          <p style={styles.successText}>¡Producto subido exitosamente!</p>
        </div>
      )}
    </IonPage>
  );
};

export default AddProduct;
