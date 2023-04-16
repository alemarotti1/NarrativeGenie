//define the Lugar router

import * as express from 'express';

import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { apagarLugar, atualizarLugar, buscarLugar, criarLugar, listarLugares } from '../controllers/Lugar';
import { lugarPrompt } from '../helpers/prompt';

const LugarRouter = express.Router();

LugarRouter.get('/', async (req, res) => {
  const places = await listarLugares(parseInt(req.query.id_historia?.toString() || ""));
  res.json({ places });
});

LugarRouter.get('/:id', async (req, res) => {
  const place = await buscarLugar(parseInt(req.params.id));
  res.json({ place });
});

LugarRouter.delete('/:id', async (req, res) => {
  await apagarLugar(parseInt(req.params.id));
  res.json();
});

LugarRouter.patch('/:id', async (req, res) => {
  const lugarParams = {
    id_elem_narr: parseInt(req.params.id),
    ...req.body,
  };

  await atualizarLugar(lugarParams);
});

LugarRouter.post('/', async (req, res) => {
  const prompt = lugarPrompt(req.body['prompt']?.toString() || "Hello world");
  const gptResult = await chatGPT.completion(prompt);
  const jsonResult = JSON.parse(gptResult.data.choices[0].message?.content.toString() || "");
  const imgPrompt = jsonResult.descricao_fisica_em_ingles?.join(",") || "Hello world";
  const waifuResult = await waifuDiff.query(imgPrompt);

  const lugarParams = {
    nome: jsonResult.nome?.toString() || "Nome do lugar",
    descricao: jsonResult.descricao?.toString() || "Descrição do lugar",
    imagem: waifuResult?.toString() || "images/teste.jpg",
    riqueza: parseInt(jsonResult.riqueza) || 0,
    saude: parseInt(jsonResult.saude) || 0,
    seguranca: parseInt(jsonResult.seguranca) || 0,
    agua: parseInt(jsonResult.agua) || 0,
    prompt: prompt,
    imgPrompt: imgPrompt,
    id_historia: req.body.id_historia
  };

  const lugarId = await criarLugar(lugarParams);
  
  res.json({ id: lugarId });
});

export default LugarRouter;
