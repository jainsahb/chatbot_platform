/**
 * REST API Integration
 */
import fetch from "node-fetch";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

export const generateGeminiResponse = async (messages) => {
  try {
    /**
     * Convert domain messages into Gemini REST format
     */
    const contents = messages.map((m) => ({
      role: m.role === "system" ? "user" : m.role,
      parts: [{ text: m.content }]
    }));
    
    const response = await fetch(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error("Gemini API failed");
    }

    return data.candidates[0].content.parts[0].text ?? "";
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};


/**
 * NEW SDK Integration
 */
// import OpenAI from "openai";

// console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// }); 

// /**
//  * Generate AI response using Gemini (OpenAI compatibility layer)
//  */
// export const generateGeminiResponse = async (messages) => {
//   try {
//     /**
//      * Convert your internal message format
//      * into OpenAI-compatible messages
//      */
//     const openAIMessages = messages.map((m) => ({
//       role: m.role,
//       content: m.content
//     }));

//     const response = await openai.chat.completions.create({
//       model: "gemini-1.5-flash",
//       messages: openAIMessages,
//       temperature: 0.7
//     });

//     return response.choices[0].message.content; //?
//   } catch (error) {
//     console.error("Gemini (OpenAI-compatible) Error:", error);
//     throw new Error("Gemini API failed");
//   }
// };
