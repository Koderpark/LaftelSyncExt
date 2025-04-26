import { Storage } from "@plasmohq/storage"
const storage = new Storage()

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
