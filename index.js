import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const genAI = new GoogleGenerativeAI("AIzaSyDak6pLoKL5Kz8BvewuVhoShdZITEIkeow"); // Replace YOUR_API_KEY with your actual API key

app.use(express.json());

app.post("/api/v1/generate", async (req, res) => {
  try {
    // Extract the prompt from the request body
    const prompt = req.body.prompt;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content based on the provided prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Send the generated content as the response
    res.status(200).json({ generatedContent: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "An error occurred while generating content." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
