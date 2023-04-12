//define the Historia router

import * as express from 'express';
import chatGPT from '../external/chatgpt';
const HistoriaRouter = express.Router();

HistoriaRouter.get('/', async (req, res) => {
    const result = await chatGPT.completion("Hello World");
    res.json({ result: result.data[0].generated_text });
});

export default HistoriaRouter;