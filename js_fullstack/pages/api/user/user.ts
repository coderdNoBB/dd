import { AppDataSource } from "../../../src/datasource"
import { UserModel } from "../../../src/model/UserModel"
import { User } from "../../../src/entity/User"
import type { NextApiRequest, NextApiResponse } from 'next'
import { Equal } from "typeorm"
import { SHA256 as sha256 } from "crypto-js";

type ResponseData = {
  user: UserModel
}
type WordArray = CryptoJS.lib.WordArray;

const hashPassword = (pwd: WordArray | string) => {
  return sha256(pwd).toString();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { username, password } = req.body;
  let db_up = true
  try {
    if (!AppDataSource.isInitialized)
      await AppDataSource.initialize()
  } catch (error) {
    db_up = false
  }

  if (db_up ) {
    const user_m = new UserModel()
    const userRepository = AppDataSource.getRepository(User)
    const user_from_db = await userRepository.findOneBy({
      name: Equal(username)
    })

    if (user_from_db) {
      if (user_from_db.pwd === hashPassword(password))
        user_m.name = user_from_db.name
      user_m.type = 'old_user'
    } else {
      const new_user = new User()
      new_user.name = username
      new_user.pwd = hashPassword(password)
      const save_res = await userRepository.save(new_user)
      user_m.name = username
      user_m.type = 'new_user'
    }
    res.status(200).json({ user: user_m })
  } else {
    const new_user = new UserModel()
    new_user.name = username
    new_user.type = 'temporary_login'
    res.status(200).json({ user: new_user })
  }
}