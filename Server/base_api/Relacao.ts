import * as express from 'express';
import db from '../config/db';
import { relacaoPrompt } from '../helpers/prompt';
import chatGPT from '../external/chatgpt';
const RelacoesRouter = express.Router();

RelacoesRouter.post('/', async (req, res) => {
    
});

RelacoesRouter.get('/descricao', async (req, res) => {
  const prompt = relacaoPrompt(
    req.query['categoria_1']?.toString() || "personagem",
    req.query['nome_1']?.toString() || "Nome",
    req.query['categoria_2']?.toString() || "personagem",
    req.query['nome_2']?.toString() || "Nome",
    req.query['prompt']?.toString() || "relacionamento entre personagens",
  );

  const gptResult = await chatGPT.completion(prompt);
  res.json({ result: gptResult.data.choices[0].message?.content.toString() || "Descrição da relação", prompt: prompt });
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

RelacoesRouter.delete('/', async (req, res) => {
    await db.$connect();

    try{
        await db.relacao.delete({
            where: {
                id_elem_narr1_id_elem_narr2: {
                    id_elem_narr1: req.body.id_elem_narr1,
                    id_elem_narr2: req.body.id_elem_narr2,
                }
            }
        });
    }catch(err){
        db.$disconnect();
        res.status(500).json({message: "database error"});
    }

    db.$disconnect();
    res.json({message: "Relacao deleted"});
});

RelacoesRouter.get('/:mundoId/', async (req, res) => {
    await db.$connect();

    const relacoes = await db.historia.findMany({
        where: {
            id_historia: parseInt(req.params.mundoId)
        },
        select: {
            elemento_narrativo: {
                select: {
                    relacao_relacao_id_elem_narr1Toelemento_narrativo: {
                        select: {
                            id_elem_narr2: true,
                            nome_relacao: true,
                            descricao: true,
                        }
                    }
                }
            }
        }
    });

    db.$disconnect();
    res.json({ relacoes });

});

RelacoesRouter.get('/:mundoId/:idElemNarrativo', async (req, res) => {
    await db.$connect();

    const relacao = await db.relacao.findMany({
        where: {
            OR: [
                {id_elem_narr1: parseInt(req.params.idElemNarrativo)},
                {id_elem_narr2: parseInt(req.params.idElemNarrativo)}
            ]
        },
    });

    db.$disconnect();
    res.json({ relacao });
});

RelacoesRouter.get('/:mundoId/:idElemNarrativo1/:idElemNarrativo2', async (req, res) => {
    await db.$connect();

    const relacao = await db.relacao.findMany({
        where: {
            AND: [
                {id_elem_narr1: parseInt(req.params.idElemNarrativo1)},
                {id_elem_narr2: parseInt(req.params.idElemNarrativo2)}
            ]
        },
    });

    db.$disconnect();
    res.json({ relacao });

});

RelacoesRouter.put('/:idElemNarrativo1/:idElemNarrativo2', async (req, res) => {
    await db.$connect();

    const relacao = await db.relacao.update({
        where: {
            id_elem_narr1_id_elem_narr2: {
                id_elem_narr1: parseInt(req.params.idElemNarrativo1),
                id_elem_narr2: parseInt(req.params.idElemNarrativo2),
            }
        },
        data: {
            nome_relacao: req.body.nome_relacao || "",
            descricao: req.body.descricao || "",
        }
    });

    res.json({ relacao });
});

export default RelacoesRouter;
