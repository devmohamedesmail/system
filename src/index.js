import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';
import './translation/i18n'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ThemeProvider } from './context/ThemeContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <PrimeReactProvider >
        <App />
      </PrimeReactProvider>
    </ThemeProvider>
  </React.StrictMode>
);


