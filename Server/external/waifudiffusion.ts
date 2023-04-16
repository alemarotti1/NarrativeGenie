import axios, { Axios, AxiosResponse } from "axios";
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

    let response : AxiosResponse | null = null;

    this.localDiffusion(prompt).then((data) => {
      response = data;
      //write the image to the images folder
      this.writeImage(data, filename, filepath).then((data) => {return new Promise((r, resolve) => {resolve(data);})}).
      catch((err) => {return new Promise((r, reject) => {reject();})});
    })
    
    .catch((err) => {
      this.eerieOrangeMix(prompt).then((data) => {
        response = data;
        
        this.writeImage(data, filename, filepath).then((data) => {return new Promise((r, resolve) => {resolve(data);})}).
        catch((err) => {return new Promise((r, reject) => {reject();})});
      })
        
      .catch((err) => {
          this.waifuDiffusion(prompt).then((data) => {
            response = data;

            this.writeImage(data, filename, filepath).then((data) => {return new Promise((r, resolve) => {resolve(data);})}).
            catch((err) => {return new Promise((r, reject) => {reject();})});
          })
        });
    });

    

    
  }
  private async localDiffusion(prompt: string) : Promise<AxiosResponse<any>> {
    //make a get request to "https://holy-grass-05650.pktriot.net/docs" to check if the model is available
    let request = await axios.get("https://holy-grass-05650.pktriot.net/docs");
    //if the model is available
    if(request.status != 200) new Promise((r, reject) => { reject(); });

    const url = "https://holy-grass-05650.pktriot.net/sdapi/v1/txt2img";

    let body = {
      "prompt": prompt+", masterpiece, high quality,",
      "negative_prompt": "nsfw, nude, text",
      "sampler_name": "DPM++ 2S a Karras",
    } 

    let response = await axios.post(url, body, { responseType: 'stream' });

    if (response.status != 200) new Promise((r, reject) => { reject(); });

    return response;
  }

  private async eerieOrangeMix(prompt: string) : Promise<AxiosResponse<any>> {
    const api = axios.create({
      baseURL: "https://api-inference.huggingface.co/models/WarriorMama777/AbyssOrangeMix2",
      headers: {
        Authorization: `Bearer ${environment.HUGGING_FACE_API_TOKEN}`
      }
    });
    let response = await api.post("/", {
      inputs: prompt,
      options: {
        wait_for_model: true,
      }
    }, { responseType: 'stream' });

    if (response.status != 200) new Promise((r, reject) => { reject(); });

    return response;

  }

  private async waifuDiffusion(prompt: string) : Promise<AxiosResponse<any>> {
    let response = await this.api.post("/stable-diffusion-v1-5", {
      inputs: prompt
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

}




const waifuDiff = new WaifuDiff();
export default waifuDiff;
