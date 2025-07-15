import { GoogleGenAI, Modality } from "@google/genai";

async function genAi(prompt) {
  const ai = new GoogleGenAI({
    // add your API key here if needed, e.g.:
    apiKey: "AIzaSyCl4LyvHoagVK-jqzNo5MuGAdcu7DudMec",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  let imageBase64 = null;

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageBase64 = part.inlineData.data; // base64 string
    }
  }

  if (!imageBase64) {
    throw new Error("No image generated");
  }

  return imageBase64; // return base64
}

export default genAi;