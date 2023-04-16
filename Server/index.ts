import express, { json, NextFunction, Request, Response, Router, urlencoded } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import "express-async-errors";

import authRouter from './base_api/auth';
import ElementoNarrativoRouter from './base_api/ElementoNarrativo';
import HistoriaRouter from './base_api/Historia';
import PersonagemRouter from './base_api/Personagem';
import RelacoesRouter from './base_api/Relacao';
import OutroRouter from './base_api/Outro';
import LugarRouter from './base_api/Lugar';

const app = express();
app.use(cors({ origin: '*' }));
app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!');
});

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/auth', authRouter);
app.use('/personagem', PersonagemRouter);
app.use('/outro', OutroRouter);
app.use('/lugar', LugarRouter);
app.use('/elemento-narrativo', ElementoNarrativoRouter);
app.use('/historia', HistoriaRouter);
app.use('/relacao', RelacoesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
