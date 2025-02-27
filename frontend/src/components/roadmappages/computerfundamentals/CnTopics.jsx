import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 5;

export default function CnQnAPage() {
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState({});
    const [category, setCategory] = useState("basic");
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch("/cnquestions.json") // Ensure the file is inside the public folder
            .then((response) => response.json())
            .then((data) => setQuestionsAndAnswers(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    const questions = questionsAndAnswers[category] || [];
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const visibleQuestions = questions.slice(startIndex, endIndex);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Q&A Section</h1>
            <div className="flex gap-4 mb-4">
                {Object.keys(questionsAndAnswers).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => { setCategory(cat); setPage(0); }}
                        className={`px-4 py-2 rounded-lg ${category === cat ? "bg-gray-700" : "bg-gray-600"}`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>
            <div className="w-full max-w-2xl">
                {visibleQuestions.map((qna, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
                        <h2 className="text-lg font-semibold">{qna.question}</h2>
                        <p className="text-gray-300">{qna.answer}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, Math.floor(questions.length / ITEMS_PER_PAGE)))}
                    disabled={endIndex >= questions.length}
                    className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
