import React from "react";
import BackgroundAnimation from "../../BackgroundAnimation";
import Footer from "../home/Footer";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    title: "Quantitative Aptitude",
    description: "Master numerical and mathematical problem-solving skills.",
    link: "/aptitopics",
  },
  {
    title: "Competitive Programming",
    description: "Enhance problem-solving speed using DSA and algorithms.",
    link: "/cp",
  },
  {
    title: "Logical Reasoning",
    description: "Sharpen your logical thinking and analytical skills.",
    link: "/logical-reasoning",
  },
  {
    title: "Data Interpretation",
    description: "Develop skills to analyze and interpret data efficiently.",
    link: "/data-interpretation",
  },
  {
    title: "Verbal Reasoning",
    description: "Improve comprehension and verbal problem-solving abilities.",
    link: "/verbal-reasoning",
  },
];

const Roadmap = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-800 text-white py-10 px-5 md:px-20">
        <BackgroundAnimation />
        <h1 className="text-4xl font-bold text-center mb-10">Roadmaps</h1>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate(topic.link)}
            >
              <h2 className="text-xl font-semibold mb-3">{topic.title}</h2>
              <p className="text-gray-300">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Roadmap;
