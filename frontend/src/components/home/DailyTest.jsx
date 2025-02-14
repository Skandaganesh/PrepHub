import { useEffect, useState, useCallback } from "react";
import axios from "axios";
// import html2canvas from "html2canvas";

const DailyTest = () => {
  const [testUrl, setTestUrl] = useState("");
  const [marks] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading] = useState(false);

  const fetchTestLink = useCallback(async () => {
    setFetching(true);
    const cachedData = JSON.parse(sessionStorage.getItem("dailyTestCache"));
    const today = new Date().toISOString().split("T")[0];

    if (cachedData && cachedData.date === today) {
      console.log("Loaded cached test link:", cachedData.link);
      setTestUrl(cachedData.link);
      setFetching(false);
      return;
    }

    try {
      const SITE_URL = import.meta.env.VITE_SITE_URL;
      const { data } = await axios.get(`${SITE_URL}`);

      if (data.link) {
        sessionStorage.setItem("dailyTestCache", JSON.stringify({ link: data.link, date: today }));
        setTestUrl(data.link);
        console.log("Fetched test link:", data.link);
      }
    } catch (error) {
      console.error("Error fetching test link:", error);
    }
    setFetching(false);
  }, []);

  useEffect(() => {
    fetchTestLink();
  }, [fetchTestLink]);
  // const captureFullPageCanvas = async () => {
  //   try {
  //     setLoading(true);
  
  //     const canvas = document.createElement("canvas");
  //     const context = canvas.getContext("2d");
  
  //     const pageHeight = document.documentElement.scrollHeight;
  //     const viewportHeight = window.innerHeight;
  //     const scrollIncrement = viewportHeight;
  //     let yOffset = 0;
  
  //     canvas.width = window.innerWidth;
  //     canvas.height = pageHeight;
  
  //     while (yOffset < pageHeight) {
  //       window.scrollTo(0, yOffset);
  //       await new Promise((resolve) => setTimeout(resolve, 300)); // Allow time for rendering
  
  //       const snapshotCanvas = document.createElement("canvas");
  //       snapshotCanvas.width = window.innerWidth;
  //       snapshotCanvas.height = viewportHeight;
  //       const snapshotContext = snapshotCanvas.getContext("2d");
  
  //       const video = document.createElement("video");
  //       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  //       video.srcObject = stream;
  
  //       await new Promise((resolve) => (video.onloadedmetadata = resolve));
  
  //       snapshotContext.drawImage(video, 0, -yOffset, window.innerWidth, pageHeight);
  //       context.drawImage(snapshotCanvas, 0, yOffset);
  
  //       yOffset += scrollIncrement;
  
  //       stream.getTracks().forEach((track) => track.stop()); // Stop screen capture
  //     }
  
  //     const finalImage = canvas.toDataURL("image/png");
  //     console.log("Full Page Screenshot Captured");
  
  //     return finalImage;
  //   } catch (error) {
  //     console.error("Error capturing full-page screenshot:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
  // const captureScreenshotAndFetchMarks = async () => {
  //   try {
  //     setLoading(true);
  //     const canvas = await html2canvas(document.body);
  //     const imageBase64 = canvas.toDataURL("image/png");

  //     const { data } = await axios.post("http://localhost:5000/upload-image", {
  //       image: imageBase64,
  //     });

  //     if (data.extractedMarks !== "Not Found") {
  //       console.log("Extracted Marks:", data.extractedMarks);
  //       setMarks(data.extractedMarks);
  //     }
  //   } catch (error) {
  //     console.error("Error capturing marks:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Daily Test</h1>

     

      {fetching ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-white">Please wait...</p>
        </div>
      ) : testUrl.includes("leetcode.com") ? (
        <div className="flex flex-col items-center">
          <button
            onClick={() => (window.location.href = testUrl)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Go to LeetCode
          </button>
        </div>
      ) : (
        <iframe
          src={testUrl}
          className="w-screen max-w-5xl h-[150vh] border-2 border-white rounded-lg"
          allowFullScreen
        />
      )}

      {loading && <p className="mt-4 text-yellow-400">Extracting marks...</p>}
      {marks && <p className="mt-4 text-lg font-bold">Marks: {marks}</p>}
    </div>
  );
};

export default DailyTest;
