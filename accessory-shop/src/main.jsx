import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('app')); // Ensure 'app' matches the ID in index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);