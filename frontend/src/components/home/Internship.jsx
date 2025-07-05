import React from "react";

const internships = [
  {
    title: "Frontend Developer Intern",
    description: "Work with React and Tailwind to build UI components for PrepHub.",
    location: "Remote",
    link: "https://example.com/frontend-intern",
  },
  {
    title: "Backend Developer Intern",
    description: "Build APIs with Node.js and MongoDB for a scalable backend.",
    location: "Bangalore, India",
    link: "https://example.com/backend-intern",
  },
  {
    title: "UI/UX Designer Intern",
    description: "Design intuitive and accessible interfaces for our users.",
    location: "Remote",
    link: "https://example.com/uiux-intern",
  },
];

const Internship = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
        
      <h1 className="text-3xl font-bold mb-10 text-center">Internships</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {internships.map((intern, index) => (
          <div
            key={index}
            className="border border-white p-6 rounded-2xl bg-gray-800 transition-all duration-300 hover:scale-105  "
          >
            <h2 className="text-2xl font-bold mb-2">{intern.title}</h2>
            <p className="text-sm text-gray-300 mb-1">📍 {intern.location}</p>
            <p className="mb-4">{intern.description}</p>
            <a
              href={intern.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center  text-white font-semibold p-3  hover:opacity-80 transition"
            >
             Apply Now.
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internship;
