import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from 'nodemailer';
import cors from "cors"
const app = express();
const genAI = new GoogleGenerativeAI("AIzaSyDak6pLoKL5Kz8BvewuVhoShdZITEIkeow"); // Replace YOUR_API_KEY with your actual API key
import fs from 'fs'

app.use(express.json());

app.use(cors())

const sendMail = async(req,res)=>{
  try {

    const {email} = req.params
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6771c317cd9753",
        pass: "640b00feb7e70e"
      }
    });
 
    const mailOptions = {
      from: "mayank0real0world@gmail.com",
      to: email,
      subject: 'Generated Content',
      text: "gerwg"
    };

    const mailresponse = await transport.sendMail
    (mailOptions);
    return mailresponse;
    
    
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}






app.post("/api/v1/generate", async (req, res) => {
  try {
    // Extract the prompt from the request body
    let prompt = "Extract the key messages and interactions from the Google Meet transcript.Summarize the conversation into actionable insights and key takeaways.Highlight important points, decisions made, action items, and any follow-up tasks.Create a bulleted list of the most significant topics discussed during the meeting.Ensure clarity, brevity, and relevance in the generated summary and bullet points.Provide a structured and organized output that can be easily understood by stakeholders. "
    
    prompt += req.body.prompt;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content based on the provided prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    // var jsonData = JSON.parse(text)
    // fs.writeFileSync('data.json',jsonData)
    
    console.log(text);
    
    // Send the generated content as the response
    res.status(200).json({ generatedContent: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "An error occurred while generating content." });
  }
});

app.get("/api/v1/:email",sendMail);




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
