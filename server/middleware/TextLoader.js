// Import the GoogleGenerativeAI class from the package
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDyoCqFArgwKj0bQvuK-V6P6PogUj6I31c");

// Define an asynchronous function to generate content
export const textLoader = async function (prompt) {
    try {
        // Get the generative model
        const model =  genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Generate content using the model
        console.log(prompt);
        const result = await model.generateContent( prompt );
        console.log(result.response.text());
        // Return the generated text
        return result.response.text();    
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}