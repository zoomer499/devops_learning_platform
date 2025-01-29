import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Получаем токен

  if (!token) {
    return <Navigate to="/login" />; // Перенаправляем на страницу входа, если токена нет
  }

  return children; // Отображаем защищенный компонент
};

export default ProtectedRoute;