//define the Historia router

import * as express from 'express';
import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';
import { listarHistorias, buscarHistoria } from '../controllers/Historia';

const HistoriaRouter = express.Router();

HistoriaRouter.get('/', async (req, res) => {
    const stories = await listarHistorias(req.query.email?.toString() || "");
    res.json({ stories });
});

HistoriaRouter.get('/:id', async (req, res) => {
    const story = await buscarHistoria(parseInt(req.params.id));
    res.json({ story });
});

/***
 * @api {post} /historia/ Cria uma nova história no banco de dados
 * @apiName CriarHistoria
 * @apiGroup Historia
 * @param {string} titulo - Título da história
 */
HistoriaRouter.put('/', async (req, res) => {
    //TODO: implementar o método de criação de histórias
});

HistoriaRouter.get('/waifu/', async (req, res) => {
    const result = await waifuDiff.query(req.query.prompt?.toString() || "Hello world");
    
    res.json({ result });
});

export default HistoriaRouter;