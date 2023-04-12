import axios from "axios";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

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

  public async query(prompt: string) {
    const response = await this.api.post("/waifu-diffusion", {
      inputs: prompt
    }, { responseType: 'stream' });

    const filename = `${uuidv4()}.jpg`;
    const filepath = path.resolve(__dirname, '..', 'images', filename);
    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve('images/' + filename));
      writer.on('error', () => reject());
    });
  }
}

const waifuDiff = new WaifuDiff();
export default waifuDiff;
