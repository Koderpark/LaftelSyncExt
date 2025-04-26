import { Storage } from "@plasmohq/storage"
import { logout } from "./auth"
import { getRoomId } from "./room"
import { clientAlert } from "./index"
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

export async function checkRoomOwner(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  const roomId = await storage.get("roomId")
  if (!jwt || !roomId) return false

  const ret = await fetch(`http://localhost:3000/room/${roomId}`, {
    method: "GET"
  })
  const room = await ret.json()

  const userId = await fetch(`http://localhost:3000/user/read`, {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` }
  })
  const user = await userId.json()

  // clientAlert(`ownerId: ${room.ownerId}, userId: ${user.userId}`)

  return room.ownerId === user.userId
}

storage.watch({
  jwt: () => {
    if (!checkJWT()) logout()
  },
  roomId: () => {
    if (!checkRoom()) getRoomId()
  },
  isRoomOwner: async () => {
    storage.set("isRoomOwner", await checkRoomOwner())
  }
})