import { database } from '../../db/mysql';
import { SELECT_TIMELINE, SELECT_USER_TWEETS, SELECT_TWEET } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id, unique_name } = req.query;
    const user_id = req.user_id;

    if (tweet_id) {
      const value = [ tweet_id ];
      const [[ tweets ]] = await database.query(SELECT_TWEET, value);
      res.data = { ...res.data, tweets };
    } 
    if (unique_name) {
      const value = [ unique_name, unique_name ];
      const [ tweets ] = await database.query(SELECT_USER_TWEETS, value);
      res.data = { ...res.data, tweets };      
    }
    if (user_id) {
      const value = [ user_id, user_id, user_id, user_id, user_id ];
      const [ tweets ] = await database.query(SELECT_TIMELINE, value);
      res.data = { ...res.data, tweets };  
    }
    
    next();
  } catch (err) {
    next(err);
  }
}