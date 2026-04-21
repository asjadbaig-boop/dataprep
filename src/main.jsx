import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import './styles/variables.css';
import './styles/base.css';
import './styles/global.css';
import './styles/navbar.css';
import './styles/themetoggle.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/companies.css';
import './styles/tech.css';
import './styles/resume.css';
import './styles/parallax.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
