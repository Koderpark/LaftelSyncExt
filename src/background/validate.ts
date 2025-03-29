import { Storage } from "@plasmohq/storage"
import { logout } from "./auth"
import { getRoomId } from "./room"

const storage = new Storage()

export async function checkJWT(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await fetch("http://localhost:3000/auth/chkJWT", {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` }
  })

  return ret.status === 200
}

export async function checkRoom(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  const roomId = await storage.get("roomId")
  if (!jwt || !roomId) return false

  const ret = await fetch(`http://localhost:3000/room/my`, {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` }
  })

  return ret.status === 200 && ret.json()["roomId"] === roomId
}

storage.watch({
  jwt: () => {
    if (!checkJWT()) logout()
  },
  roomId: () => {
    if (!checkRoom()) getRoomId()
  }
})
