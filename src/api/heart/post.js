import { database } from '../../db/mysql';
import { INSERT_HEART, CHECK_HEART_DUP } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;
    if (typeof tweet_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};

    const value = [ user_id, tweet_id ];
    const [ checkDup ] = await database.query(CHECK_HEART_DUP, value);
    if (checkDup.length > 0) throw {code: 'ER_DUP_HEART', message: 'dupicated heart'};
    const [ result ] = await database.query(INSERT_HEART, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}