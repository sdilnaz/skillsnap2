import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-proj-2h9hFB5bgkirAQaKX7ZZT3BlbkFJW7IHN2YDYdsF6gen9gXN",
});

export default openai;
