import { database } from '../../db/mysql';
import { DELETE_HEART, SELECT_HEARTS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { tweet_id } = req.body;

    const user_id = req.user_id;
    //if (typeof tweet_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};

    const value = [ user_id, tweet_id ];
    await database.query(DELETE_HEART, value);
    const [ hearts ] = database.query(SELECT_HEARTS, user_id);

    res.data = { ...res.data, hearts };
    next(); 
  } catch (err) {
    next(err);
  }
}