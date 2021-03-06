import { database } from '../../db/mysql';
import { SELECT_USER_INFORMATION } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { unique_name } = req.query;

    const value = [ unique_name ];
    const [[ user ]] = await database.query(SELECT_USER_INFORMATION, value);

    if (user.user_id === undefined) throw {code: 'ER_INVAILD_USER', message: 'Not found user'};
    req.user_id = user.user_id;
    res.data = { ...res.data, user };
    next();
  } catch(err) {
    next(err);
  }
}