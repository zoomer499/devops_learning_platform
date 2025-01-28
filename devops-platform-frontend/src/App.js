import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import CoursePage from './CoursePage';
import LessonPage from './LessonPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>DevOps Platform</h1>
        <Routes>
          <Route path="/" element={<Register />} /> {/* Главная страница с регистрацией */}
          <Route path="/courses/:courseId" element={<CoursePage />} /> {/* Страница курса */}
          <Route path="/lessons/:lessonId" element={<LessonPage />} /> {/* Страница урока */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;