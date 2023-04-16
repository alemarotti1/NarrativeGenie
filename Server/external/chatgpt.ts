import { OpenAIApi, Configuration } from "openai";

class ChatGPT {
  private readonly api: OpenAIApi;
  private readonly configuration: Configuration;

  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    });

    this.api = new OpenAIApi(this.configuration);
  }

  public async completion(prompt: string) {
    const response = await this.api.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    return response;
  }
}

const chatGPT = new ChatGPT();
export default chatGPT;
