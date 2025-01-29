import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import CoursePage from './CoursePage';
import LessonPage from './LessonPage';
import Navbar from './Navbar';
import Login from './Login'; // Импорт страницы входа
import ProtectedRoute from './ProtectedRoute'; // Импорт защищенного маршрута
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <h1>DevOps Platform</h1>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* Страница входа */}
          <Route
            path="/courses/:courseId"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          /> {/* Защищенный маршрут */}
          <Route
            path="/lessons/:lessonId"
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            }
          /> {/* Защищенный маршрут */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;