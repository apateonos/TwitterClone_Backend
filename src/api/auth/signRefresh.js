import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const refresh = await jwt.sign({ type: 'refresh', user_id }, process.env.JWT_SECRET_KEY, {expiresIn: '7d', issuer: 'apateonos@gmail.com'});

    res.cookie('refresh', refresh, {
      maxAge: 7*24*60*60*1000,
      path: '/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })

    next();
  } catch (err) {
    next(err);
  }
}