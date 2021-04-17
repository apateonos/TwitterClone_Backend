import { database } from '../../db/mysql';
import { SELECT_FOLLOWER, SELECT_FOLLOWING } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const value = [ user_id ];

    const [ followers ] = database.query(SELECT_FOLLOWER, value);
    const [ followings ] = database.query(SELECT_FOLLOWING, value);

    res.data = { ...res.data, followers, followings };
    next(); 
  } catch (err) {
    next(err);
  }
}