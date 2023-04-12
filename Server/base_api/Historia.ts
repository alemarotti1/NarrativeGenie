//define the Historia router

import * as express from 'express';
import chatGPT from '../external/chatgpt';
import waifuDiff from '../external/waifudiffusion';

const HistoriaRouter = express.Router();

HistoriaRouter.get('/', async (req, res) => {
    const result = await chatGPT.completion(req.query['prompt']?.toString() || "Hello world");
    res.json({ result: result.data[0].generated_text });
});

HistoriaRouter.get('/waifu/', async (req, res) => {
    const result = await waifuDiff.completion("Hello World");
    res.json({ result: result.data });
});

export default HistoriaRouter;