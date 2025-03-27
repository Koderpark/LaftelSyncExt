import { Storage } from "@plasmohq/storage"
import { logout } from "./auth"

const storage = new Storage()

export async function checkJWT(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await fetch("http://localhost:3000/user/rawJwt", {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` }
  })

  return ret.status === 200
}

export async function checkRoom(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  const roomId = await storage.get("roomId")
  if (!jwt || !roomId) return false

  const ret = await fetch(`http://localhost:3000/room/current`, {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` }
  })

  return ret.status === 200 && ret.json()["roomId"] === roomId
}

export async function fallback() {
  logout()
}

storage.watch({
  jwt: () => {
    if (!checkJWT()) fallback()
  },
  roomId: () => {
    if (!checkRoom()) fallback()
  }
})
