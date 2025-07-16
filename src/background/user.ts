import { Storage } from "@plasmohq/storage"
import { Request } from "./auth"
const storage = new Storage()

/**
 * 유저 정보 조회
 * @returns 유저 아이디 (not currently using)
 */
export const userInfo = async (): Promise<string> => {
  const res = await Request("http://localhost:3000/user/read", "GET")
  return res["loginId"]
}
