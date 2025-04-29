import { Storage } from "@plasmohq/storage"
const storage = new Storage()

/**
 * 유저 정보 조회
 * @returns 유저 아이디 (not currently using)
 */
export const userInfo = async (): Promise<string> => {
  const jwt = await storage.get("jwt")
  const res = await fetch("http://localhost:3000/user/read", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json()
  return data["loginId"]
}
