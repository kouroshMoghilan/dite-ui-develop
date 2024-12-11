import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/index.css';
import './assets/css/output.css';
import Routings from './routes/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routings />
    </BrowserRouter>
  </StrictMode>

)