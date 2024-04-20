import React, { useState } from 'react';
import axios from '../axiosConfig';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'lector',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es requerido';
    }

    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Correo electrónico no válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // No enviar si hay errores
    }

    try {
      const response = await axios.post('/v1/api/auth/register', formData);
      console.log('Usuario registrado:', response.data);
    } catch (err) {
      console.error('Error al registrar usuario:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <div>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div>
        <label>Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div>
        <label>Rol:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="lector">Lector</option>
          <option value="creador">Creador</option>
        </select>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Registration;