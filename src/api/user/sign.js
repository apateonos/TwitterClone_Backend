import hash from 'pbkdf2';
import { database } from '../../db/mysql';
import { INSERT_USER } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { unique_name, user_image, user_name, password, profile } = req.body;
    if (!(4 < unique_name.length && unique_name.length < 12)) 
      throw {code: 'ER_INVAILD_UNIQUE_NAME', message: 'Unique name must be at least 4 letters and no more than 12 letters.'};
    if (!(4 < user_name.length && user_name.length < 12)) 
      throw {code: 'ER_INVAILD_USER_NAME', message: 'User name must be at least 4 letters and no more than 12 letters.'};
    if (!(4 < password.length)) 
      throw {code: 'ER_INVAILD_PASSWORD', message: 'Password must be at least 4 characters long.'};

    const ban_list = ['<', '>', '.', ',', '='];
    for(let i = 0; i < unique_name.length; i++) {
      const char = unique_name[i];
      const check = ban_list.some(e => e === char);
      if (check) throw {code: 'ER_INVAILD_UNIQUE_NAME', message: "Unique name can'not contain '<', '>', '.', ',', '='."};
    }
      
    const hashed_password = await hash.pbkdf2Sync(password, process.env.HASH_SALT_KEY, 1024, 64, 'sha512').toString('hex');
    const value = [ unique_name, user_image, user_name, hashed_password, profile ];

    const [ result ] = await database.query(INSERT_USER, value);

    req.user_id = result.insertId;
    res.data = { ...res.data, result };
    next();
  } catch(err) {
    next(err);
  }
}