// Style
import '../styles/App.css';
// React
// import { useState } from 'react';
// Router
import { Outlet } from 'react-router';
// Components
import NavBar from '../components/NavBar';







function App() {

  return (
    <>
    <NavBar />
    <p>Hi</p>
    <Outlet />
    </>
  )
}

export default App
