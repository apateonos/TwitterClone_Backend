import { database } from '../../db/mysql';
import { SELECT_USER_RETWEETS, SELECT_TWEET_HEARTS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const { tweet_id } = req.query;
    console.log(tweet_id);
    if (user_id) {
      const value = [ user_id ];
      const [ retweets ] = await database.query(SELECT_USER_RETWEETS, value); 
      res.data = { ...res.data, retweets };
    }
    else if (tweet_id) {
      const value = [ tweet_id ];
      const [ retweets ] = await database.query(SELECT_TWEET_HEARTS, value); 
      console.log(retweets);
      res.data = { ...res.data, retweets };
    }
   
    next(); 
  } catch (err) {
    next(err);
  }
}