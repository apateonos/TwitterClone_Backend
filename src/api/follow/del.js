import { database } from '../../db/mysql';
import { DELETE_FOLLOW } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { follower_id } = req.body;
    const user_id = req.user_id;
    const value = [ user_id, follower_id ];

    const [ result ] = database.query(DELETE_FOLLOW, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}