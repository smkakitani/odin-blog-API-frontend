// Style
import '../styles/App.css';
// React
import { useState } from 'react';
// Router
import { Outlet, useParams } from 'react-router';
// Components
import NavBar from '../components/NavBar';
import { AuthProvider } from '../utils/AuthContext'; // Authentication logic with useContext and custom hook



// When to ask for token on server? 
/* 
- user comment
- user updating their data
- user deleting their comment
 */


function App() {
  const { postId } = useParams();

  return (
    <AuthProvider >
      <NavBar />
      <p>Hi</p>
      <Outlet />
    </AuthProvider>
  )
}

export default App
