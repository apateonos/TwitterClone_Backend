import { database } from '../../db/mysql';
import { INSERT_HEART } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;
    const value = [ user_id, tweet_id ];

    const [ result ] = database.query(INSERT_HEART, value);

    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}