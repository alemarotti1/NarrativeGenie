//define the Personagem router

import * as express from 'express';

import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { apagarPersonagem, atualizarPersonagem, buscarPersonagem, criarPersonagem, listarPersonagens } from '../controllers/Personagem';
import { personagemPrompt } from '../helpers/prompt';

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

PersonagemRouter.patch('/:id', async (req, res) => {
  const personagemParams = {
    id_elem_narr: parseInt(req.params.id),
    ...req.body,
  };

  await atualizarPersonagem(personagemParams);
});

PersonagemRouter.post('/', async (req, res) => {
  const prompt = personagemPrompt(req.body['prompt']?.toString() || "Hello world");
  const gptResult = await chatGPT.completion(prompt);
  const jsonResult = JSON.parse(gptResult.data.choices[0].message?.content.toString() || "");
  const imgPrompt = jsonResult.descricao_fisica_em_ingles?.join(",") || "Hello world";
  const waifuResult = await waifuDiff.query(imgPrompt);

  const personagemParams = {
    nome: jsonResult.nome?.toString() || "Nome do personagem",
    descricao: jsonResult.descricao?.join(",") || "Descrição do personagem",
    imagem: waifuResult?.toString() || "images/teste.jpg",
    backstory: jsonResult.backstory?.toString() || "Backstory do personagem",
    especie: jsonResult.especie?.toString() || "Espécie do personagem",
    personalidade: jsonResult.personalidade?.join(",") || "Personalidade do personagem",
    prompt: prompt,
    imgPrompt: imgPrompt,
    id_historia: req.body.id_historia
  };

  const personagemId = await criarPersonagem(personagemParams);
  
  res.json({ id: personagemId });
});

export default PersonagemRouter;
