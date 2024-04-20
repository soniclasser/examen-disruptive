import React, { useState } from 'react';
import axios from '../axiosConfig';

const AddContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/v1/api/contents', formData);
      console.log('Contenido agregado:', response.data);
    } catch (err) {
      console.error('Error agregando contenido:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Contenido</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Tipo:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Contenido</button>
    </form>
  );
};

export default AddContent;