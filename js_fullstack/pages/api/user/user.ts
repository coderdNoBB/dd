import { AppDataSource, dbConnected } from "../../../components/datasource"
import { User } from "../../../components/entity/User"
import type { NextApiRequest, NextApiResponse } from 'next'


type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.query)

  if (dbConnected) {
    const userRepository = AppDataSource.getRepository(User)
    const new_user = new User()
    new_user.name = 'd'
    new_user.pwd = 'd'
    const u = userRepository.save(new_user)
    u.then((val) => console.log("async val：", val));
    res.status(200).json({ message: 'TypeORM integrated succeed!' })
  } else {
    const new_user = new User()
    new_user.name = 'd'
    new_user.pwd = 'd'
    res.status(200).json({ message: 'Db not connected' })
  }
}