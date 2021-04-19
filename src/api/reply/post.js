import { database } from '../../db/mysql';
import { INSERT_PREPLY } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { reply_id } = req.body;
    if (reply_id && typeof reply_id === 'number') {
      const tweet_id = req.tweet_id;
      const user_id = req.user_id;

      const value = [ user_id, tweet_id, reply_id ];
      const [ result ] = database.query(INSERT_PREPLY, value);

      res.data = { ...res.data, result };
    }

    next(); 
  } catch (err) {
    next(err);
  }
}