import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LessonPage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/lessons/${lessonId}`);
        setLesson(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (!lesson) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      {lesson.video_url && (
        <div>
          <h2>Видео</h2>
          <video controls src={lesson.video_url} />
        </div>
      )}
      <h2>Материалы</h2>
      <ul>
        {lesson.materials.map((material) => (
          <li key={material.id}>
            <a href={material.file_url} target="_blank" rel="noopener noreferrer">
              {material.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonPage;