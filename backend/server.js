// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const Tesseract = require("tesseract.js");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json({ limit: "50mb" }));

// app.post("/upload-image", async (req, res) => {
//   try {
//     const { image } = req.body;
//     if (!image) return res.status(400).json({ error: "No image provided" });

//     const base64Data = image.replace(/^data:image\/png;base64,/, "");
//     const imagePath = path.join(__dirname, "screenshot.png");

//     fs.writeFileSync(imagePath, base64Data, "base64");
//     console.log("Screenshot saved:", imagePath);

//     const { data } = await Tesseract.recognize(imagePath, "eng", {
//       logger: (m) => console.log(m),
//     });

//     console.log("Extracted text:", data.text);

//     // 🔹 Extract score in the format "Marks : X/Y"
//     const marksMatch = data.text.match(/Marks\s*:\s*(\d+)\s*\/\s*(\d+)/);
//     const marks = marksMatch ? `${marksMatch[1]}/${marksMatch[2]}` : "Not Found";

//     res.json({ extractedMarks: marks });
//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).json({ error: "Failed to process image" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse"); // pdf-parse library to extract text from PDF

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/upload-pdf", async (req, res) => {
  try {
    const { pdf } = req.body;
    if (!pdf) return res.status(400).json({ error: "No PDF provided" });

    const base64Data = pdf.replace(/^data:application\/pdf;base64,/, "");
    const pdfPath = path.join(__dirname, "test.pdf");

    fs.writeFileSync(pdfPath, base64Data, "base64");
    console.log("PDF saved:", pdfPath);

    // Parse the PDF to extract text
    const pdfData = fs.readFileSync(pdfPath);
    const parsedData = await pdfParse(pdfData);
    const text = parsedData.text;

    console.log("Extracted text:", text);

    // Extract marks (assuming format "Marks: 8/10")
    const marksMatch = text.match(/Marks\s*:\s*(\d+)\s*\/\s*(\d+)/);
    const marks = marksMatch ? `${marksMatch[1]}/${marksMatch[2]}` : "Not Found";

    res.json({ extractedMarks: marks });
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
