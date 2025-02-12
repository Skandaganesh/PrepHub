import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import Tesseract from "tesseract.js";

const DailyTest = () => {
  const [testUrl, setTestUrl] = useState("");
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTestUrl("https://www.indiabix.com/online-test/c-programming-test/13"); // Test URL
  }, []);

  // Take a full-page screenshot & extract text using OCR
  const captureAndExtractMarks = async () => {
    setLoading(true);
    try {
      const canvas = await html2canvas(document.documentElement, { useCORS: true });
      const image = canvas.toDataURL("image/png");

      const { data } = await Tesseract.recognize(image, "eng");
      const extractedText = data.text;

      console.log("OCR Output:", extractedText);

      // Extract Marks (Customize regex based on Indiabix format)
      const match = extractedText.match(/Marks\s*:\s*(\d+\/\d+)/);
      if (match) {
        const extractedMarks = match[1];
        setMarks(extractedMarks);
        alert("Extracted Marks:", extractedMarks);

        // Send marks to backend
        await axios.post("https://your-backend.com/api/submit-score", {
          score: extractedMarks,
          user: "TestUser", // Replace with actual user info
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

  // Detect test submission and trigger OCR
  useEffect(() => {
    const detectSubmission = (event) => {
      if (event.target.innerText.toLowerCase().includes("submit")) {
        console.log("Test submitted! Extracting marks...");
        setTimeout(captureAndExtractMarks, 5000); // Wait 5 sec for results to load
      }
    };

    document.addEventListener("click", detectSubmission);
    return () => document.removeEventListener("click", detectSubmission);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Daily Test</h1>

      {testUrl ? (
        <iframe
          id="testIframe"
          src={testUrl}
          className="w-full max-w-4xl h-[150vh] border-2 border-white rounded-lg"
          allowFullScreen
        />
      ) : (
        <p>Loading test...</p>
      )}

      {loading && <p className="mt-4 text-yellow-400">Extracting marks...</p>}
      {marks && <p className="mt-4 text-lg font-bold">Marks: {marks}</p>}
    </div>
  );
};

export default DailyTest;
