import BackgroundAnimation from "../../BackgroundAnimation";
import Hbg from "../../assets/homebg.jpg";
import UIimage from "../../assets/UI.gif";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(${Hbg})`,
        backgroundSize: "150%", // Zoom out effect
        backgroundPosition: "center",
      }}
    >
      <BackgroundAnimation />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Welcome to PrepHub</h1>
          <p className="text-lg mb-6">
            Your one-stop solution for placement preparation, resources, and
            guidance.
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="bg-gradient-to-r from-cyan-300 to-blue-700 px-6 py-3 rounded-lg text-white font-semibold hover:scale-105 transition border-2 border-white"
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={UIimage} alt="PrepHub Hero" className="w-full max-w-md" />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-900 bg-opacity-80">
        <h2 className="text-center text-3xl font-bold mb-10">
          What Our Users Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm text-center"
            >
              <img
                src={`/profile-${id}.jpg`}
                alt="User"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-sm italic">
                "PrepHub has transformed the way I prepare for interviews! Highly
                recommended."
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-20 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="text-lg">
          PrepHub is a platform dedicated to helping students and professionals
          excel in their careers. We provide top-notch resources, mock
          interviews, coding challenges, and expert guidance. Our goal is to
          bridge the gap between learning and landing your dream job. With a
          strong community and curated content, PrepHub ensures that you stay
          ahead in the competitive job market. Join us today and take your
          placement preparation to the next level!
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
