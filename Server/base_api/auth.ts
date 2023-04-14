//define the auth router
import * as express from 'express';
const authRouter = express.Router();
import db from '../config/db';
import * as bcrypt from 'bcrypt';
const saltRounds = 7;


authRouter.post('/', async (req, res) => {
    //check if the user is valid
    //if valid, send the token
    //if not, send 401
    let user = null;

    await db.$connect()
    user = await db.conta.findFirst({
        where: {
            email: req.body.email,
        }
    });
    let senha = "";
    if(user && user.senha) senha = user.senha;

    const match = bcrypt.compareSync(req.body.senha, senha);
    if(match){
        res.status(200).json({message: "User logged in"});
    }
    else{
        res.status(401).json({message: "Wrong password"});
    }
    await db.$disconnect();
        
});

authRouter.post('/register/', async (req, res) => {
    

    await db.$connect();
    
    const hash = await bcrypt.hash(req.body.senha, saltRounds);
    let user = await db.conta.findFirst({
        where: {
            AND: [
                {email: req.body.email},
            ]
        }
    });
    if(user){
        res.status(409).json({message: "User already exists"});
    }
    else{
        db.conta.create({
            data: {
                email: req.body.email,
                senha: hash,
            }
        }).then((user) => {
            res.status(201).json({message: "User created"});
        }).catch((err) => {
            res.status(500).json({message: "database error"});
        });
    }
    
    await db.$disconnect();
    


});

export default authRouter;