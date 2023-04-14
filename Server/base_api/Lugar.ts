//define the Lugar router

import * as express from 'express';

import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { buscarLugar, criarLugar, listarLugares } from '../controllers/Lugar';

const LugarRouter = express.Router();

LugarRouter.get('/', async (req, res) => {
  const places = await listarLugares(parseInt(req.query.id_historia?.toString() || ""));
  res.json({ places });
});

LugarRouter.get('/:id', async (req, res) => {
  const place = await buscarLugar(parseInt(req.params.id));
  res.json({ place });
});

LugarRouter.post('/', async (req, res) => {
  const [gptResult, waifuResult] = await Promise.all([
    chatGPT.completion(req.body['gptPrompt']?.toString() || "Hello world"),
    waifuDiff.query(req.body['waifuPrompt']?.toString() || "Hello world")
  ]);

  const lugarParams = {
    nome: "Lorem Ipsum",
    descricao: gptResult?.data[0].generated_text,
    imagem: waifuResult?.toString() || "",
    id_historia: req.body.id_historia
  };

  const lugarId = await criarLugar(lugarParams);
  
  res.json({ id: lugarId });
});

export default LugarRouter;
