import { database } from '../../db/mysql';
import { INSERT_HEART, CHECK_HEART_DUP } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;
    console.log(tweet_id, user_id);
    const value = [ user_id, tweet_id ];
    console.log(value);

    const [ check ] = await database.query(CHECK_HEART_DUP, value);
    console.log(check);
    if (check.length > 0) throw {code: 'ER_DUP_HEART', message: 'dupicated heart'};
    console.log('pass');
    const [ result ] = await database.query(INSERT_HEART, value);
    console.log(result);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}