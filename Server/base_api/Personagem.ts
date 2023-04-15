//define the Personagem router

import * as express from 'express';

import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { apagarPersonagem, buscarPersonagem, criarPersonagem, listarPersonagens } from '../controllers/Personagem';

const PersonagemRouter = express.Router();

PersonagemRouter.get('/', async (req, res) => {
  const characters = await listarPersonagens(parseInt(req.query.id_historia?.toString() || ""));
  res.json({ characters });
});

PersonagemRouter.get('/:id', async (req, res) => {
  const character = await buscarPersonagem(parseInt(req.params.id));
  res.json({ character });
});

PersonagemRouter.delete('/:id', async (req, res) => {
  await apagarPersonagem(parseInt(req.params.id));
  res.json();
});

PersonagemRouter.post('/', async (req, res) => {
  const [gptResult, waifuResult] = await Promise.all([
    chatGPT.completion(req.body['gptPrompt']?.toString() || "Hello world"),
    waifuDiff.query(req.body['waifuPrompt']?.toString() || "Hello world")
  ]);

  const personagemParams = {
    nome: "Lorem Ipsum",
    descricao: gptResult?.data[0].generated_text,
    imagem: waifuResult?.toString() || "",
    backstory: "Lorem Ipsum",
    especie: "Lorem Ipsum",
    id_historia: req.body.id_historia
  };

  const personagemId = await criarPersonagem(personagemParams);
  
  res.json({ id: personagemId });
});

export default PersonagemRouter;
