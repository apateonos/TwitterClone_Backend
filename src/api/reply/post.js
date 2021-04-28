import { database } from '../../db/mysql';
import { INSERT_REPLY } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { reply_id } = req.body;
    console.log(reply_id);

    if (reply_id) {
      const tweet_id = req.tweet_id;
      const user_id = req.user_id;

      const value = [ user_id, tweet_id, reply_id ];
      const [ result ] = await database.query(INSERT_REPLY, value);

      res.data = { ...res.data, result };
    }

    next(); 
  } catch (err) {
    next(err);
  }
}