import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Portfolio() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    // Realizar una solicitud GET al backend para obtener los elementos
    axios.get('/api/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar una solicitud POST al backend para crear un elemento
    axios.post('/api/items', formData)
      .then(() => {
        // Actualizar la lista de elementos
        axios.get('/api/items')
          .then((response) => {
            setItems(response.data);
          });
        // Limpiar el formulario
        setFormData({ name: '', description: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (itemId) => {
    // Realizar una solicitud DELETE al backend para eliminar un elemento
    axios.delete(`/api/items/${itemId}`)
      .then(() => {
        // Actualizar la lista de elementos
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      <h1>Portfolio</h1>
      <form onSubmit={handleSubmit}>
        {/* Formulario para crear elementos */}
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            {/* Botones para editar y actualizar elementos */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
