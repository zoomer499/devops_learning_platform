import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/courses/1">Курсы</Link> {/* Пример ссылки на курс с ID = 1 */}
        </li>
        <li>
          <Link to="/login">Войти</Link> {/* Ссылка на страницу входа */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;