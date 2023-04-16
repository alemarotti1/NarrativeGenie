import * as express from 'express';
import db from '../config/db';
const RelacoesRouter = express.Router();

RelacoesRouter.post('/', async (req, res) => {
    
});

RelacoesRouter.put('/', async (req, res) => {
    await db.$connect();

    const relacao = await db.relacao.create({
        data: {
            id_elem_narr1: req.body.id_elem_narr1,
            id_elem_narr2: req.body.id_elem_narr2,
            nome_relacao: req.body.nome_relacao || "",
            descricao: req.body.descricao || "",
        }
    });

    res.json({ relacao });
});


export default RelacoesRouter;