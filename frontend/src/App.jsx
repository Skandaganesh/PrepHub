import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/auth/LoginPage'
import './App.css'
import HomePage from './components/home/Home';
import ContactUs from './components/home/Contact';
import Explore from './components/home/Explore';
import DailyTest from './components/home/DailyTest';
import Roadmap from './components/roadmappages/Roadmap';
function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/test" element={<DailyTest />} />
        <Route path="/roadmaps" element={<Roadmap />} />
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
