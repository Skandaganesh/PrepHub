import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import Tesseract from "tesseract.js";

const DailyTest = () => {
  const [testUrl, setTestUrl] = useState("");
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchTestLink = useCallback(async () => {
    setFetching(true);
    const cachedData = JSON.parse(localStorage.getItem("dailyTestCache"));
    const today = new Date().toISOString().split("T")[0];

    if (cachedData && cachedData.date === today) {
      setTestUrl(cachedData.link);
      setFetching(false);
      return;
    }
    const SITE_URL = import.meta.env.VITE_SITE_URL;
    try {
      const { data } = await axios.get(`${SITE_URL}`);
      if (data.link) {
        localStorage.setItem("dailyTestCache", JSON.stringify({ link: data.link, date: today }));
        setTestUrl(data.link);
      }
    } catch (error) {
      console.error("Error fetching test link:", error);
    }
    setFetching(false);
  }, []);

  useEffect(() => {
    fetchTestLink();
  }, [fetchTestLink]);

  const captureAndExtractMarks = async () => {
    setLoading(true);
    try {
      const canvas = await html2canvas(document.body, { useCORS: true });
      const image = canvas.toDataURL("image/png");

      const { data } = await Tesseract.recognize(image, "eng");
      const extractedText = data.text;

      console.log("OCR Output:", extractedText);

      const match = extractedText.match(/Marks\s*:\s*(\d+\/\d+)/);
      if (match) {
        const extractedMarks = match[1];
        setMarks(extractedMarks);
        alert("Extracted Marks: " + extractedMarks);

        await axios.post("https://your-backend.com/api/submit-score", {
          score: extractedMarks,
          user: "TestUser",
        });

        console.log("Marks submitted successfully!");
      } else {
        console.log("Marks not found in OCR output.");
      }
    } catch (error) {
      console.error("Error extracting marks:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const detectSubmission = (event) => {
      if (event.target.innerText.toLowerCase().includes("submit")) {
        console.log("Test submitted! Extracting marks...");
        setTimeout(captureAndExtractMarks, 5000);
      }
    };

    document.addEventListener("click", detectSubmission);
    return () => document.removeEventListener("click", detectSubmission);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Daily Test</h1>

      {fetching ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-white">Please wait...</p>
        </div>
      ) : testUrl ? (
        <iframe
          id="testIframe"
          src={testUrl}
          className="w-screen max-w-7xl h-[150vh] border-2 border-white rounded-lg"
          allowFullScreen
        />
      ) : (
        <div className="flex flex-col items-center">
          <p>LeetCode login is blocked inside an iframe.</p>
          <a
            href="https://leetcode.com/accounts/login/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Click Here to Sign In
          </a>
        </div>
      )}

      {loading && <p className="mt-4 text-yellow-400">Extracting marks...</p>}
      {marks && <p className="mt-4 text-lg font-bold">Marks: {marks}</p>}
    </div>
  );
};

export default DailyTest;
