import { OpenAI } from "openai";
import * as dotenv from "dotenv";
import { ChatCompletionMessageParam } from "openai/resources";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

(async () => {
  const messages: Array<ChatCompletionMessageParam> = [
    { role: "user", content: "What is 2+2?" }
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages
  });
  console.log(response.choices[0].message.content);
})();