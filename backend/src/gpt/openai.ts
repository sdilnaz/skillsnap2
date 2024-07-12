import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-proj-nls2jTRQaYKYVRJVn043T3BlbkFJTJdcDxvl5igKVhjaLxwV",
});

export default openai;
