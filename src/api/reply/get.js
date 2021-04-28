import { database } from '../../db/mysql';
import { SELECT_TWEET_REPLYS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.query;
    console.log('>>>>>' tweet_id);
    const value = [ tweet_id ];
    console.log(value, SELECT_TWEET_REPLYS);
    const [ replys ] = await database.query(SELECT_TWEET_REPLYS, value);
    console.log(replys);
    res.data = { ...res.data, replys };
    next(); 
  } catch (err) {
    next(err);
  }
}