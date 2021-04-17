import hash from 'pbkdf2';
import { database } from '../../db/mysql';
import { LOGIN_ACCOUNT } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { unique_name, password } = req.body;
    if (!(4 < unique_name.length && unique_name.length < 12)) 
      throw {code: 'ER_INVAILD_UNIQUE_NAME', message: 'Unique name must be at least 4 letters and no more than 12 letters.'};
    if (!(4 < password.length)) 
      throw {code: 'ER_INVAILD_PASSWORD', message: 'Password must be at least 4 characters long.'};

    const hashed_password = await hash.pbkdf2Sync(password, process.env.HASH_SALT_KEY, 1024, 64, 'sha512').toString('hex');
    const value = [ unique_name, hashed_password ];

    const [[ result ]] = await database.query(LOGIN_ACCOUNT, value); 

    req.user_id = result.user_id;
    res.data = { ...res.data, result };
    next();
  } catch(err) {
    next(err);
  }
}