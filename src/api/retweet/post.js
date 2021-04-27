import { database } from '../../db/mysql';
import { INSERT_RETWEET } from '../../db/query';

export default async (req, res,next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;
    const value = [ user_id, tweet_id ];

    const [ check ] = await database.query(CHECK_RETWEET_DUP, value);
    if (check.length > 0) throw {code: 'ER_DUP_RETWEET', message: 'dupicated retweet'};
    const [ result ] = await database.query(INSERT_RETWEET, value);

    res.data = { ...res.data, result };
    next();
  } catch (err) {
    next(err);
  }
}