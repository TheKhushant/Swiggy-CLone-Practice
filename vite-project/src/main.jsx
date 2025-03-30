import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';  //imp to track image
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
