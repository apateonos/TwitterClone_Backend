import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { database } from '../db/mysql';
dotenv.config();

export default async (socket, next, res) => {
  try {
    const token = socket.handshake.headers.authorization.split('Bearer ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, type } = decoded;

    socket.user_id = id;
    const [ room_list ] = await database.query('SELECT * FROM rooms WHERE user_id = ?;', id);
    socket.room_list = room_list;
    
    next();
  } catch (error) {
    next(err);
  }
}