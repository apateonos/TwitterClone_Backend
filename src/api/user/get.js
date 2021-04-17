import hash from 'pbkdf2';
import { database } from '../../db/mysql';
import { LOGIN_ACCOUNT } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { unique_name } = req.query;
    const user_id = req.user_id;
    let value;
    
    if(unique_name) {
      value = [ unique_name ];
    } else {
      value = [ user_id ];
    }

    const [[ user ]] = await database.query(SELECT_USER, value);

    req.user_id = user.user_id;
    res.data = { ...res.data, user };
    next();
  } catch(err) {
    next(err);
  }
}