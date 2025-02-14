import { useState } from "react";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const topics = [
  "Number System",
  "Percentage",
  "Ratio & Proportion",
  "Profit & Loss",
  "Time & Work",
  "Time, Speed & Distance",
  "Permutation & Combination",
  "Probability",
  "Simple & Compound Interest",
  "Mensuration",
  "Algebra",
  "Logarithms",
  "Data Interpretation",
];

export default function AptitudeTopics() {
  const [open, setOpen] = useState({});

  const toggleTopic = (index) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Aptitude Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {topics.map((topic, index) => (
          <Link
            to={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}
            key={index}
            className="bg-gray-800 p-3 rounded-lg flex items-center cursor-pointer hover:bg-gray-700 transition"
          >
            {open[index] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <Folder size={20} className="ml-2 text-yellow-400" />
            <span className="ml-3">{topic}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
