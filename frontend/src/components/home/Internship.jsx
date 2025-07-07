import { useEffect, useState } from "react";

const Internship = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => setInternships(data))
      .catch((err) => console.error("Error fetching internships:", err));
  }, []);

  const handleShare = (intern) => {
    const shareUrl = `https://prephub.netlify.app/internship-list/`;
    const shareText = `${intern.title}\n📍 Location: ${intern.location}\n💰 CTC: ${intern.ctc || "Not specified"}\n`;

 
    if (navigator.share) {
      navigator
        .share({
          title: intern.title,
          text: shareText,
          url: shareUrl,
          
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => alert("🔗 Link copied to clipboard!"))
        .catch(() => alert("❌ Failed to copy link"));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Internships</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {internships.map((intern, index) => (
          <div
            key={index}
            className="border border-white p-6 rounded-2xl bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            {intern.image && (
              <img
                src={intern.image}
                alt={intern.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            <h2 className="text-2xl font-bold mb-2">{intern.title}</h2>
            <p className="text-sm text-gray-300 mb-1">📍 {intern.location}</p>
            <p className="mb-4">{intern.description}</p>
            <p className="mb-4">💰 CTC: {intern.ctc  || "Not specified"} </p>

            <a
              href={`${import.meta.env.VITE_API_URL}/${intern.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center font-semibold text-lg px-5 py-3 rounded-md transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl mb-2"
            >
              🚀 Apply Now
            </a>

            <button
              onClick={() => handleShare(intern)}
              className="w-full text-center font-medium text-sm py-2 rounded bg-green-500 hover:bg-gray-600 transition"
            >
              🔗 Share
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internship;
