import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {
  try {
    console.log('sign');
    console.log('inSign req', req.user);
    
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}