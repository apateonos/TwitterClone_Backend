import { database } from '../../db/mysql';
import { SELECT_TWEET_REPLYS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.query;
    if (typeof tweet_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};

    const value = [ tweet_id ];
    const [ replys ] = database.query(SELECT_TWEET_REPLYS, value);

    res.data = { ...res.data, replys };
    next(); 
  } catch (err) {
    next(err);
  }
}