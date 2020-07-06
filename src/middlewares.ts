import {Request, Response, NextFunction} from 'express';
import firebaseApp from './firebase';

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.token as string;
        const decode = await firebaseApp.auth().verifyIdToken(token);
        console.log('decode', decode);
        next();
    }catch(e){
        res.status(403).send('Acceso denegado');
    }
};

export { userAuth };