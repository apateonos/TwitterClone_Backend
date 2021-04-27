import { database } from '../../db/mysql';
import { SELECT_HEARTS } from '../../db/query';

export default async (req, res, next) => {
  try {
    const user_id = req.user_id;

    const value = [ user_id ];
    const [ hearts ] = await database.query(SELECT_HEARTS, value);

    res.data = { ...res.data, hearts };
    next(); 
  } catch (err) {
    next(err);
  }
}