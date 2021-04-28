import { database } from '../../db/mysql';
import { INSERT_TWEET } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_text } = req.body;
    let tweet_image = null;
    if (req.files) {
      //tweet_image = req.files.filename;
      console.log(req.files);
    } 
    const user_id = req.user_id;
    
    if (tweet_text === undefined && tweet_image === undefined) throw {code: 'ER_TWEET_EMPTY', message: 'Tweet must have either text or image in request to tweet'};

    const value = [ user_id, tweet_text, tweet_image ];
    const [ result ] = await database.query(INSERT_TWEET, value);

    req.tweet_id = result.insertId;
    res.data = { ...res.data, result };
    next();
  } catch (err) {
    next(err);
  }
}