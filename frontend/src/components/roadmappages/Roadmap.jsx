import React from "react";
import BackgroundAnimation from "../../BackgroundAnimation";
import Footer from "../home/Footer";

const topics = [
  { title: "Quantitative Aptitude", description: "Master numerical and mathematical problem-solving skills." },
  { title: "Competitive Programming", description: "Enhance problem-solving speed using DSA and algorithms." },
  { title: "Logical Reasoning", description: "Sharpen your logical thinking and analytical skills." },
  { title: "Data Interpretation", description: "Develop skills to analyze and interpret data efficiently." },
  { title: "Verbal Reasoning", description: "Improve comprehension and verbal problem-solving abilities." },
];

const Roadmap = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-800 text-white py-10 px-5 md:px-20">
        <BackgroundAnimation/>
      <h1 className="text-4xl font-bold text-center mb-10">Roadmaps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-semibold mb-3">{topic.title}</h2>
            <p className="text-gray-300">{topic.description}</p>
          </div>
        ))}
      </div>
     
    </div>

<Footer/>
    </>
  );
};

export default Roadmap;
