import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Проверка токена

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Перенаправление на страницу входа
  }

  return children; // Отображение защищенного компонента
};

export default ProtectedRoute;