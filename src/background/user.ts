import { Storage } from "@plasmohq/storage"
import { authRequest } from "./auth"
const storage = new Storage()

/**
 * 유저 정보 조회
 * @returns 유저 아이디 (not currently using)
 */
export const userInfo = async (): Promise<string> => {
  const res = await authRequest("http://localhost:3000/user/read", "GET")
  return res["loginId"]
}
