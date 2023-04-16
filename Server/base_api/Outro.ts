//define the Outro router

import * as express from 'express';

import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { apagarOutro, buscarOutro, criarOutro, listarOutros } from '../controllers/Outro';
import { outroPrompt } from '../helpers/prompt';

const OutroRouter = express.Router();

OutroRouter.get('/', async (req, res) => {
  const others = await listarOutros(parseInt(req.query.id_historia?.toString() || ""));
  res.json({ others });
});

OutroRouter.get('/:id', async (req, res) => {
  const other = await buscarOutro(parseInt(req.params.id));
  res.json({ other });
});

OutroRouter.delete('/:id', async (req, res) => {
  await apagarOutro(parseInt(req.params.id));
  res.json();
});

OutroRouter.post('/', async (req, res) => {
  const prompt = outroPrompt(req.body['prompt']?.toString() || "Hello world");
  const gptResult = await chatGPT.completion(prompt);
  const jsonResult = JSON.parse(gptResult.data.choices[0].message?.content.toString() || "");
  const imgPrompt = jsonResult.prompt_para_modelo_de_imagem_em_ingles?.toString() || "Hello world";
  const waifuResult = await waifuDiff.query(imgPrompt);

  const outroParams = {
    nome: jsonResult.nome?.toString() || "Nome do objeto",
    descricao: jsonResult.descricao?.toString() || "Descrição do objeto",
    imagem: waifuResult?.toString() || "images/teste.jpg",
    prompt: prompt,
    imgPrompt: imgPrompt,
    id_historia: req.body.id_historia
  };

  const outroId = await criarOutro(outroParams);
  
  res.json({ id: outroId });
});

export default OutroRouter;
