// Styles
import '../styles/App.css';
import styled from 'styled-components';
// React
// import { useState } from 'react';
// Router
import { Outlet } from 'react-router';
// Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { AuthProvider } from '../utils/AuthContext'; // Authentication logic with useContext and custom hook



// 
const Main = styled.main`
  color: rgb(144, 119, 235);
  background-color: rgba(108, 33, 179, 0.8);
  border-radius: 0.4em;

  padding: 1rem;

  min-height: 50vh;
`;

function App() {

  return (
    <AuthProvider >
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AuthProvider>
  )
}

export default App
