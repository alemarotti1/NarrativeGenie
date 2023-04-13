import axios from "axios";

import environment from "../config/environment";

class ChatGPT {
  private readonly api;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api-inference.huggingface.co/models/EleutherAI/",
      headers: {
        Authorization: `Bearer ${environment.HUGGING_FACE_API_TOKEN}`
      }
    });
  }

  public async completion(prompt: string) {
    const data = await this.api.post("gpt-neo-2.7B", {
      inputs: prompt
    });

    return data;
  }
}

const chatGPT = new ChatGPT();
export default chatGPT;