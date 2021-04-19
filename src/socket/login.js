import { database } from '../db/mysql';
import { SELECT_PARTICIPATED_ROOMS } from '../db/query';

export default async (socket) => {
  try {
    const user_id = socket.user_id;
    
    const value = [ user_id ];
    const [ rooms ] = await database.query(SELECT_PARTICIPATED_ROOMS, value);

    if (rooms.length > 0) {
      for (let i = 0; i < rooms.length; i++) {
        const room_name = rooms[i].room_id;
        socket.join(room_name);
      }
    }
  } catch (err) {

  }
}