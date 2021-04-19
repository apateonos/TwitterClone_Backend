import { database } from '../../db/mysql';
import { INSERT_FOLLOW } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { follower_id } = req.body;
    const user_id = req.user_id;
    if (typeof follower_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};
    
    const value = [ user_id, follower_id ];
    const [ result ] = database.query(INSERT_FOLLOW, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}