import { database } from '../../db/mysql';
import { SELECT_USER_HEARTS, SELECT_TWEET_HEARTS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const { tweet_id } = req.params;

    if (user_id) {
      const value = [ user_id ];
      const [ hearts ] = await database.query(SELECT_USER_HEARTS, value);
      res.data = { ...res.data, hearts };
    }
    else if (tweet_id) {
      const value = [ tweet_id ];
      const [ hearts ] = await database.query(SELECT_TWEET_HEARTS, value);
      res.data = { ...res.data, hearts };
    }
   
    next(); 
  } catch (err) {
    next(err);
  }
}