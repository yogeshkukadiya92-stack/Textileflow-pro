import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TextileProvider } from './context/TextileContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TextileProvider>
      <App />
    </TextileProvider>
  </React.StrictMode>
);
