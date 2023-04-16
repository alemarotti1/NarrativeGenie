import axios from "axios";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import environment from "../config/environment";

class WaifuDiff {
  private readonly api;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api-inference.huggingface.co/models/runwayml/",
      
    });
  }

  public async query(prompt: string) {
    const filename = `${uuidv4()}.jpg`;
    const filepath = path.resolve(__dirname, '..', 'images', filename);

    let response = null;
    try {
      const api = axios.create({
        baseURL: "https://api-inference.huggingface.co/models/WarriorMama777/AbyssOrangeMix2",
        headers: {
          Authorization: `Bearer ${environment.HUGGING_FACE_API_TOKEN}`
        }
      });
      response = await api.post("/", {
        inputs: prompt
      }, { responseType: 'stream' });

        
    }
    catch (error){
      const response = await this.api.post("/stable-diffusion-v1-5", {
        inputs: prompt
      }, { responseType: 'stream' });

      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);
    }
    
    if(!response) return new Promise((r, reject) => { reject(); });

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
