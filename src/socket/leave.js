import { database } from "../db/mysql";
import { LEAVE_ROOM, SELECT_REMAINING_PEOPLE, DELETE_MESSAGE, DELETE_ROOM } from '../db/query';

export default async (socket, req, res) => {
  try {
    const user_id = socket.user_id;
    const { room_id } = req;

    const value = [ room_id, user_id ];
    await socket.leave(room_name);
    await database.query(LEAVE_ROOM, value);

    const [ rp ] = await database.query(SELECT_REMAINING_PEOPLE, room_id);
    if (rp.length === 0) {
      await database.query(DELETE_MESSAGE, room_id);
      await database.query(DELETE_ROOM, room_id);
    }
  } catch (err) {

  }
}