import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">Inicio</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Registro</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Iniciar Sesión</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add-content">Agregar Contenido</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
