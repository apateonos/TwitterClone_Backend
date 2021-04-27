import { database } from '../../db/mysql';
import { SELECT_TIMELINE } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;

    const value = [ user_id, user_id, user_id ];
    const [ timeline ] = await database.query(SELECT_TIMELINE, value);
    
    res.data = { ...res.data, timeline };
    next();
  } catch (err) {
    next(err);
  }
}