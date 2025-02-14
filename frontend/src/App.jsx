import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './components/auth/LoginPage';
import './App.css';
import HomePage from './components/home/Home';
import ContactUs from './components/home/Contact';
import Explore from './components/home/Explore';
import DailyTest from './components/home/DailyTest';
import Roadmap from './components/roadmappages/Roadmap';
import AptitudeTopics from './components/roadmappages/aptitude/AptitudeTopics';
import Numbers from './components/roadmappages/aptitude/Number';

function App() {
  const isValidURL = (url) => {
      try {
        return Boolean(new URL(url));
      } catch (e) {
        return false;
      }
    };
  useEffect(() => {
    
    
    window.scrollTo(top, 0);
    const prefetchTestLink = async () => {
      const cachedData = JSON.parse(localStorage.getItem("dailyTestCache"));
      const today = new Date().toISOString().split("T")[0];
  
      if (cachedData && cachedData.date === today && isValidURL(cachedData.link)) return;
  
      try {
        const { data } = await axios.get(import.meta.env.VITE_SITE_URL);
        console.log("Pre-fetch API Response:", data); 
  
        if (isValidURL(data?.link)) {
          localStorage.setItem(
            "dailyTestCache",
            JSON.stringify({ link: data.link, date: today })
          );
          console.log("Prefetched and saved test link:", data.link);
        } else {
          console.warn("Invalid link received:", data?.link);
        }
      } catch (error) {
        console.error("Error pre-fetching test link:", error);
      }
    };
  
    prefetchTestLink();
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/test" element={<DailyTest />} />
        <Route path="/roadmaps" element={<Roadmap />} />
        <Route path="/aptitopics" element={<AptitudeTopics />} />
        <Route path="/number-system" element={<Numbers/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
