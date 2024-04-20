import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContentList = async () => {
      try {
        const response = await axios.get('/v1/api/contents');
        setContentList(response.data);
      } catch (err) {
        console.error('Error obteniendo la lista de contenido:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContentList();
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Lista de Contenidos</h2>
      <ul>
        {contentList.map((content) => (
          <li key={content._id}>
            <Link to={`/content/${content._id}`}>{content.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;
