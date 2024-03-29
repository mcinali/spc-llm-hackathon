import { Configuration, OpenAIApi } from "openai";
import { interview1, interview2 } from "../../data/userInterview";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.prompt),
    temperature: 0,
    max_tokens: 80,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(prompt) {
  const fullPrompt = `
    ${interview1}

    ${prompt}
  `;
  return fullPrompt;
}
