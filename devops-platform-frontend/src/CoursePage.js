import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/courses/${courseId}/lessons`);
        setLessons(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <div>
      <h1>Уроки курса</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <a href={`/lessons/${lesson.id}`}>{lesson.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursePage;