import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { user_id, type } = decoded;
    if(type !== 'access') throw {code: 'ER_INVAILD_TOKEN', message: 'wrong token'};

    req.user_id = user_id;
    next();
  } catch (err) {
    next(err)
  }
}