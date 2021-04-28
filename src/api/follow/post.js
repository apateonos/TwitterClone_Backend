import { database } from '../../db/mysql';
import { INSERT_FOLLOW, CHECK_FOLLOW_DUP } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { following_id } = req.body;
    const user_id = req.user_id;
    if (typeof following_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};
    
    const value = [ user_id, following_id ];
    const [ check ] = await database.query(CHECK_FOLLOW_DUP, value);
    if (check.length > 0) throw {code: 'ER_DUP_FOLLOW', message: 'dupicated follower'};
    const [ result ] = await database.query(INSERT_FOLLOW, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}