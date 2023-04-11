import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import authRouter from './base_api/auth';
import ElementoNarrativoRouter from './base_api/ElementoNarrativo';
import HistoriaRouter from './base_api/Historia';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req : Request, res : Response) => {
    res.send('Hello World!');
});

app.use('/auth', authRouter);
app.use('/elemento-narrativo', ElementoNarrativoRouter);
app.use('/historia', HistoriaRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});