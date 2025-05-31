import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.API_KEY,
});

export default client;