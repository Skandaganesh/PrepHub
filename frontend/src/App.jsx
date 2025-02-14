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
  useEffect(() => {
    window.scrollTo(top, 0);
    const prefetchTestLink = async () => {
      const cachedData = JSON.parse(localStorage.getItem("dailyTestCache"));
      const today = new Date().toISOString().split("T")[0];
    
      if (cachedData && cachedData.date === today && cachedData.link) return; // Skip if cached
    
      try {
        const { data } = await axios.get(import.meta.env.VITE_SITE_URL);
        console.log("Pre-fetch API Response:", data); // Debugging
    
        if (data?.link) {
          localStorage.setItem(
            "dailyTestCache",
            JSON.stringify({ link: String(data.link), date: today })
          );
          console.log("Prefetched and saved test link:", data.link);
        } else {
          console.warn("Pre-fetch failed: No valid link in response.");
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
