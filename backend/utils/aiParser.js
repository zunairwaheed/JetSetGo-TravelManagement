import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getSmartFilters = async (query) => {
  const prompt = `Convert this tour search query to filters:
"${query}"

Respond only with valid JSON in this format:
{
  "price": { "max": 300 },
  "continent": "Asia",
  "theme": "beach",
  "dateRange": { "from": "2025-06-01", "to": "2025-08-31" }
}`;

  try {
    const response = await axios.post(
      process.env.DEEPSEEK_API_URL,
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that converts travel search queries into structured filters."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);

  } catch (err) {
    throw new Error('DeepSeek request failed');
  }
};
