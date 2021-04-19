import hash from 'pbkdf2';
import { database } from '../../db/mysql';
import { LOGIN_USER_ACCOUNT } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { unique_name, password } = req.body;
    if (!(4 < unique_name.length && unique_name.length < 12)) 
      throw {code: 'ER_INVAILD_UNIQUE_NAME', message: 'ID must be at least 4 letters and no more than 12 letters.'};
    if (!(4 < password.length)) 
      throw {code: 'ER_INVAILD_PASSWORD', message: 'Password must be at least 4 characters long.'};

    const ban_list = ['<', '>', '.', ',', '='];
    for(let i = 0; i < unique_name.length; i++) {
      const char = unique_name[i];
      const check = ban_list.some(word => word === char);
      if (check) throw {code: 'ER_INVAILD_UNIQUE_NAME', message: "ID can'not contain '<', '>', '.', ',', '='."};
    }

    const hashed_password = await hash.pbkdf2Sync(password, process.env.HASH_SALT_KEY, 1024, 64, 'sha512').toString('hex');
    const value = [ unique_name, hashed_password ];
    const [[ user ]] = await database.query(LOGIN_USER_ACCOUNT, value);
    if (!user.user_id) throw {code: 'ER_NOT_FOUND_ACCOUNT', message: 'Please check your passord and ID'};

    req.user_id = user.user_id;
    res.data = { ...res.data, user };
    next();
  } catch(err) {
    next(err);
  }
}