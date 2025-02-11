import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/auth/LoginPage'
import './App.css'
import HomePage from './components/home/Home';
import ContactUs from './components/home/Contact';
import Explore from './components/home/Explore';
function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/explore" element={<Explore/>}/>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
