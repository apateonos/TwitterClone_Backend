import { database } from '../../db/mysql';
import { INSERT_FOLLOW, CHECK_FOLLOW_DUP, SELECT_FOLLOWINGS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { following_id } = req.body;
    const user_id = req.user_id;
    if (typeof following_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};
    
    const value = [ user_id, following_id ];
    const [ check ] = await database.query(CHECK_FOLLOW_DUP, value);
    if (check.length > 0) throw {code: 'ER_DUP_FOLLOW', message: 'dupicated follower'};
    await database.query(INSERT_FOLLOW, value);
    const [ followings ] = await database.query(SELECT_FOLLOWINGS, user_id);

    res.data = { ...res.data, followings };
    next(); 
  } catch (err) {
    next(err);
  }
}