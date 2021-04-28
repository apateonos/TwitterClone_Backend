import { database } from '../db/mysql';
import { CREATE_ROOM, JOIN_ROOM } from '../db/query';
import { v4 as uuidv4 } from 'uuid';

export default async (socket, req, res) => {
  try {
    console.log('create');
    const user_id = socket.user_id;
    const { users } = req;
    const room_name = uuidv4().split('-').join('');
    console.log(room_name);
    
    //const [ result ] = await database.query(CREATE_ROOM, room_name);
    //console.log(result);
    //const room_id = result.insertId;
    
    await socket.join(room_name);
    //await database.query(JOIN_ROOM, [room_id, user_id]);

    users.forEach(async p => {
      //const value = [ room_id, p ];
      await socket.to(p).emit('receive invite', { room_name })
      //await database.query(JOIN_ROOM, value);
    });
  } catch (err) {
    
  }
};