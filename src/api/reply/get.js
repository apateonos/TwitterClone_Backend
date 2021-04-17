import { database } from '../../db/mysql';
import { SELECT_TWEET_REPLYS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.query;
    const value = [ tweet_id ];

    const [ replys ] = database.query(SELECT_TWEET_REPLYS, value);

    res.data = { ...res.data, replys };
    next(); 
  } catch (err) {
    next(err);
  }
}