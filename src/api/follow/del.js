import { database } from '../../db/mysql';
import { DELETE_FOLLOW } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { following_id } = req.body;
    const user_id = req.user_id;
    if (typeof following_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};
        
    const value = [ user_id, following_id ];
    const [ result ] = await database.query(DELETE_FOLLOW, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}