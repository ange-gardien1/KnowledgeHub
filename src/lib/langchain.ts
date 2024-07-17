import { ChatOpenAI } from "@langchain/openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default model;
