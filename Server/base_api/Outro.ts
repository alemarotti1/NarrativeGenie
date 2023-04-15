//define the Outro router

import * as express from 'express';

import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { apagarOutro, buscarOutro, criarOutro, listarOutros } from '../controllers/Outro';

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
  const [gptResult, waifuResult] = await Promise.all([
    chatGPT.completion(req.body['gptPrompt']?.toString() || "Hello world"),
    waifuDiff.query(req.body['waifuPrompt']?.toString() || "Hello world")
  ]);

  const outroParams = {
    nome: "Lorem Ipsum",
    descricao: gptResult?.data[0].generated_text,
    imagem: waifuResult?.toString() || "",
    id_historia: req.body.id_historia
  };

  const outroId = await criarOutro(outroParams);
  
  res.json({ id: outroId });
});

export default OutroRouter;
