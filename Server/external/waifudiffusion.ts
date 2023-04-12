import axios from "axios";

import environment from "../config/environment";

class WaifuDiff {
  private readonly api;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api-inference.huggingface.co/models/hakurei/",
      headers: {
        Authorization: `Bearer ${environment.HUGGING_FACE_API_TOKEN}`
      }
    });
  }

  public async completion(prompt: string) {
    const data = await this.api.post("waifu-diffusion", {
      inputs: prompt
    });

    return data;
  }
}

const waifuDiff = new WaifuDiff();
export default waifuDiff;
