import { database } from '../../db/mysql';
import { SELECT_RETWEETS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;

    const value = [ user_id ];
    const [ retweets ] = await database.query(SELECT_RETWEETS, value);

    res.data = { ...res.data, retweets };
    next(); 
  } catch (err) {
    next(err);
  }
}