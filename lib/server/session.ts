import { NextApiRequest } from "next"
import { currentUnixTime } from "./utils"
import { UserInfo } from "./withSession"

export const saveUserToSession = async (req: NextApiRequest, userInfo: UserInfo, expireInSec: number) => {
  req.session.user = {
    ...userInfo,
    expiry: currentUnixTime() + expireInSec,
  }
  await req.session.save()
}

