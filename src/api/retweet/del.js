import { database } from '../../db/mysql';
import { DELETE_RETWEETS, SELECT_RETWEETS } from '../../db/query';

export default async (req, res,next) => {
  try {
    const { tweet_id } = req.body;
    const user_id = req.user_id;
    
    const value = [ user_id, tweet_id ];
    await database.query(DELETE_RETWEETS, value);
    const [ retweets ] = await database.query(SELECT_RETWEETS, user_id);

    res.data = { ...res.data, retweets };
    next();
  } catch (err) {
    next(err);
  }
}