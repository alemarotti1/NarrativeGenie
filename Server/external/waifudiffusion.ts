import axios, { Axios, AxiosResponse } from "axios";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import environment from "../config/environment";

class WaifuDiff {
  public async query(prompt: string) {
    const filename = `${uuidv4()}.jpg`;
    const filepath = path.resolve(__dirname, '..', 'images', filename);
    let data, pathResult;

    try {
      data = await this.eerieOrangeMix(prompt);
      pathResult = await this.writeImage(data, filename, filepath);
    } catch (err) {
      try {
        data = await this.localDiffusion(prompt);
        pathResult = await this.writeImageBase64(data, filename, filepath);
      } catch (err) {
          data = await this.waifuDiffusion(prompt);
          pathResult = await this.writeImage(data, filename, filepath);
      }
    }

    return pathResult;
  }

  private async localDiffusion(prompt: string) : Promise<AxiosResponse<any>> {
    //make a get request to "https://holy-grass-05650.pktriot.net/docs" to check if the model is available
    let request = await axios.get("https://holy-grass-05650.pktriot.net/docs");
    //if the model is available
    if(request.status != 200) new Promise((r, reject) => { reject(); });

    const url = "https://holy-grass-05650.pktriot.net/sdapi/v1/txt2img";

    let body = {
      "prompt": prompt+", masterpiece, high quality, realistic,",
      "negative_prompt": "nsfw, nude, text",
      "sampler_name": "DPM++ 2S a Karras",
    } 

    let response = await axios.post(url, body);

    if (response.status != 200) new Promise((r, reject) => { reject(); });

    return response;
  }

  private async eerieOrangeMix(prompt: string) : Promise<AxiosResponse<any>> {
    const completePrompt = prompt + ", masterpiece, high quality, realistic";
    const api = axios.create({
      baseURL: "https://api-inference.huggingface.co/models/WarriorMama777/EerieOrangeMix",
      headers: {
        Authorization: `Bearer ${environment.HUGGING_FACE_API_TOKEN}`
      }
    });

    let response = await api.post("/", {
      inputs: completePrompt,
    }, { responseType: 'stream' });

    if (response.status != 200) new Promise((r, reject) => { reject(); });

    return response;
  }

  private async waifuDiffusion(prompt: string) : Promise<AxiosResponse<any>> {
    const completePrompt = prompt + ", masterpiece, high quality, realistic";
    const api = axios.create({
      baseURL: "https://api-inference.huggingface.co/models/runwayml/",
      headers: {
        Authorization: `Bearer ${environment.HUGGING_FACE_API_TOKEN}`
      }
    });

    let response = await api.post("/stable-diffusion-v1-5", {
      inputs: completePrompt
    }, { responseType: 'stream' });

    if (response.status != 200) new Promise((r, reject) => { reject(); });

    return response;
  }

  private async writeImage(response: AxiosResponse<any>, filename: string, filepath : string) : Promise<string> {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve('images/' + filename));
      writer.on('error', () => reject());
    });
  }

  private async writeImageBase64(response: AxiosResponse<any>, filename: string, filepath : string) : Promise<string> {
    const buffer = Buffer.from(response.data.images[0], "base64");
    fs.writeFileSync(filepath, buffer);
    
    return new Promise((resolve, reject) => {
      resolve('images/' + filename);
    });
  }
}

const waifuDiff = new WaifuDiff();
export default waifuDiff;
