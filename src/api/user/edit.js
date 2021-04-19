import { database } from '../../db/mysql';
import { EDIT_USER_ACCOUNT } from '../../db/query';

export default async (req, res, next) => {
  try {
    const { user_image, user_name, profile } = req.body;
    const user_id = req.user_id;
    
    const ban_list = ['<', '>', '.', ',', '='];
    for(let i = 0; i < user_name.length; i++) {
      const char = user_name[i];
      const check = ban_list.some(word => word === char);
      if (check) throw {code: 'ER_INVAILD_USER_NAME', message: "Name can'not contain '<', '>', '.', ',', '='."};
    }

    const value = [ user_name, user_image, profile, user_id ];
    const [[ result ]] = database.query(EDIT_USER_ACCOUNT, value);

    res.data = { ...res.data, result };
    next();
  } catch(err) {
    next(err);
  }
}