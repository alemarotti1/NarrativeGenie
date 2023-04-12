import axios from "axios";
import * as openai from "openai";

import environment from "../config/environment";

class ChatGPT {
  private readonly api : openai.OpenAIApi;
  private readonly configuration : openai.Configuration;
  private models : any;

  constructor() {
    this.configuration = new openai.Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    });

    this.api = new openai.OpenAIApi(this.configuration);
  }

  public async loadModels() {
    this.models = await this.api.listModels();
  }

  public async completion(prompt: string) {
    const data = await this.api.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.5,
    });

    return data;
  }
}

const chatGPT = new ChatGPT();
export default chatGPT;
