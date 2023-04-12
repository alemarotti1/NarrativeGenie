//define the ElementoNarrativo router

import * as express from 'express';


const ElementoNarrativoRouter = express.Router();

ElementoNarrativoRouter.get('/', (req, res) => {
    res.send(req.query);
});

/***
 * @api {put} /ElementoNarrativo/ Cria um novo elemento narrativo no banco de dados
 * @apiName CriarElementoNarrativo
 * @apiGroup ElementoNarrativo
 * @param {string} nome - Nome do elemento narrativo
 */
ElementoNarrativoRouter.put('/', (req, res) => {
    const value = req.body;
    //create a new ElementoNarrativo
    const elemento = new ElementoNarrativo(value.id_elem_narr, value.Historia_id_historia, value.tipo, value.historia);
});



export default ElementoNarrativoRouter;