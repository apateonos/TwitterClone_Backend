import { database } from '../../db/mysql';
import { INSERT_HEARTS, CHECK_HEART_DUP } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;
    const value = [ user_id, tweet_id ];

    const [ check ] = await database.query(CHECK_HEART_DUP, value);
    if (check.length > 0) throw {code: 'ER_DUP_HEART', message: 'dupicated heart'};
    const [ result ] = await database.query(INSERT_HEARTS, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}