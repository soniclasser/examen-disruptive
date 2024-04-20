import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from './axiosConfig';
import NavBar from './components/NavBar';
import ContentList from './components/ContentList';
import ContentDetail from './components/ContentDetail';
import AddContent from './components/AddContent';
import Registration from './components/Registration';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get('/v1/api/auth/check', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsAuthenticated(response.data.isValid);
    } catch (err) {
      console.error('Error verificando la autenticidad:', err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login onLogin={checkAuth} />} />
        <Route
          path="/add-content"
          element={
            <ProtectedRoute
              element={<AddContent />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path="/content/:id" element={<ContentDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
