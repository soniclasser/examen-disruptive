import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

const ContentDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = true;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/v1/api/contents/${id}`);
        setContent(response.data);
      } catch (err) {
        console.error('Error obteniendo el contenido:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!content) {
    return <p>Contenido no encontrado</p>;
  }

  return (
    <div>
      <h2>Detalle del Contenido</h2>
      <p>Nombre: {content.name}</p>
      <p>Tipo: {content.type}</p>
      <p>Descripción: {content.description}</p>
    </div>
  );
};

export default ContentDetail;
