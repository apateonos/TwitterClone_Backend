import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const token = await jwt.sign({ type: 'access', user_id }, process.env.JWT_SECRET_KEY, {expiresIn: '1h', issuer: 'apateonos@gmail.com'});

    res.data = { ...res.data, token };

    next();
  } catch (err) {
    next(err);
  }
}