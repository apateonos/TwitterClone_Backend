import { database } from '../../db/mysql';
import { DELETE_HEART } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;
    if (typeof tweet_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};

    const value = [ user_id, tweet_id ];
    const [ result ] = await database.query(DELETE_HEART, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}