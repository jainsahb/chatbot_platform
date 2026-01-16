import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const uploadFileToOpenAI = async (filePath, originalName) => {
  try {
    const response = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    return {
      fileId: response.id,
      filename: originalName,
    };
  } catch (error) {
    console.error("Error uploading file to OpenAI:", error);
    throw Error("OpenAI upload error");
  }
};
