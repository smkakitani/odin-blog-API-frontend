// Styles
import '../styles/index.css';
// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Router
import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes.jsx';
// Main
// import App from './App.jsx';




// 
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
