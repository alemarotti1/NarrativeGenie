//define the auth router
import * as express from 'express';
const authRouter = express.Router();

authRouter.post('/', (req, res) => {
    res.send('auth route');
});

export default authRouter;