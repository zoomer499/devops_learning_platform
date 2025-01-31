const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'devops_platform',
  password: 'password',
  port: 5432,
});


const jwt = require('jsonwebtoken'); // Убедитесь, что jwt установлен: npm install jsonwebtoken

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Поиск пользователя по email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    // Генерация токена
    const token = jwt.sign({ userId: user.rows[0].id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Хеширование пароля
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Получение списка курсов
app.get('/courses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/courses/:courseId/lessons', async (req, res) => {
    const { courseId } = req.params;
    try {
      const result = await pool.query('SELECT * FROM lessons WHERE course_id = $1', [courseId]);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/lessons/:lessonId', async (req, res) => {
    const { lessonId } = req.params;
    try {
      const lessonResult = await pool.query('SELECT * FROM lessons WHERE id = $1', [lessonId]);
      const materialsResult = await pool.query('SELECT * FROM materials WHERE lesson_id = $1', [lessonId]);
  
      const lesson = lessonResult.rows[0];
      if (lesson) {
        lesson.materials = materialsResult.rows;
      }
  
      res.status(200).json(lesson);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Запуск сервера
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});