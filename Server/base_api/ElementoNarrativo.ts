//define the ElementoNarrativo router

import * as express from 'express';
const ElementoNarrativoRouter = express.Router();

ElementoNarrativoRouter.get('/', (req, res) => {
    res.send(req.query);
});



export default ElementoNarrativoRouter;