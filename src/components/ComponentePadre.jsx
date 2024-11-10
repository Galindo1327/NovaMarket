// ParentComponent.jsx
import React from 'react';
import AddProduct from './AddProduct'; 

const ParentComponent = () => {
  const handleAddProduct = (newProduct) => {
    // Lógica para agregar el nuevo producto
    console.log("Producto agregado:", newProduct);
  };

  return (
    <div>
      <AddProduct onAddProduct={handleAddProduct} />
    </div>
  );
};

export default ParentComponent;
