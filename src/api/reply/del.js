import { database } from '../../db/mysql';
import { DELETE_REPLY } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { reply_id } = req.body;
    const user_id = req.user_id;
    //if (typeof reply_id !== 'number') throw {code: 'ER_INVAILD_TARGET', message: 'invaild request'};

    const value = [ user_id, reply_id ];
    const [ result ] = await database.query(DELETE_REPLY, value);
    
    res.data = { ...res.data, result };
    next(); 
  } catch (err) {
    next(err);
  }
}