import { database } from '../../db/mysql';
import { SELECT_FOLLOWERS, SELECT_FOLLOWINGS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const value = [ user_id ];
    
    const [ followers ] = database.query(SELECT_FOLLOWERS, value);
    const [ followings ] = database.query(SELECT_FOLLOWINGS, value);

    res.data = { ...res.data, followers, followings };
    next(); 
  } catch (err) {
    next(err);
  }
}