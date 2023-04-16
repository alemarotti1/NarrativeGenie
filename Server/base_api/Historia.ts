//define the Historia router

import * as express from 'express';

import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { listarHistorias, buscarHistoria, criarHistoria, apagarHistoria } from '../controllers/Historia';
import { historiaPrompt } from '../helpers/prompt';

const HistoriaRouter = express.Router();

HistoriaRouter.get('/', async (req, res) => {
  const stories = await listarHistorias(req.query.email?.toString() || "");
  res.json({ stories });
});

HistoriaRouter.get('/:id', async (req, res) => {
  const story = await buscarHistoria(parseInt(req.params.id));
  res.json({ story });
});

HistoriaRouter.delete('/:id', async (req, res) => {
  await apagarHistoria(parseInt(req.params.id));
  res.json();
});

/***
 * @api {post} /historia/ Cria uma nova história no banco de dados
 * @apiName CriarHistoria
 * @apiGroup Historia
 * @param {string} titulo - Título da história
 */
HistoriaRouter.post('/', async (req, res) => {
  const prompt = historiaPrompt(req.body['prompt']?.toString() || "Hello world");
  const gptResult = await chatGPT.completion(prompt);
  const jsonResult = JSON.parse(gptResult.data.choices[0].message?.content.toString() || "");
  const imgPrompt = jsonResult.prompt_para_modelo_de_imagem_em_ingles?.toString() || "Hello world";
  const waifuResult = await waifuDiff.query(imgPrompt);

  const historiaParams = {
    nome: jsonResult.nome?.toString() || "Nome do mundo",
    descricao: jsonResult.descricao?.toString() || "Descrição do mundo",
    path_img_capa: waifuResult?.toString() || "images/teste.jpg",
    prompt: prompt,
    imgPrompt: imgPrompt,
  };

  const historiaId = await criarHistoria(historiaParams);
  
  res.json({ id: historiaId });
});

HistoriaRouter.post('/gpt/', async (req, res) => {
  const gptResult = await chatGPT.completion(req.body['prompt']?.toString() || "Hello world");
  
  res.json({ result: gptResult.data });
});

HistoriaRouter.get('/waifu/', async (req, res) => {
  const result = await waifuDiff.query(req.query.prompt?.toString() || "Hello world");
  
  res.json({ result });
});

export default HistoriaRouter;
