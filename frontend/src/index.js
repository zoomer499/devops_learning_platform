import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Используется React 18 API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);