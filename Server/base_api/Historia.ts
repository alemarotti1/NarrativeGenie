//define the Historia router

import * as express from 'express';
const HistoriaRouter = express.Router();

HistoriaRouter.get('/', (req, res) => {
    res.send("Historia route");
});

export default HistoriaRouter;