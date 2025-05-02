import { Storage } from "@plasmohq/storage"
import { logout } from "./auth"
import { getRoomId } from "./room"
import { clientAlert } from "./index"
import { authRequest } from "./auth"
const storage = new Storage()

export async function checkJWT(): Promise<boolean> {
  const ret = await authRequest("http://localhost:3000/auth/chkJWT", "GET")
  return ret
}

export async function checkRoom(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  const roomId = await storage.get("roomId")
  if (!jwt || !roomId) return false

  const ret = await authRequest("http://localhost:3000/room/my", "GET")
  return ret && ret.roomId === roomId
}

export async function checkRoomOwner(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  const roomId = await storage.get("roomId")
  if (!jwt || !roomId) return false

  const room = await authRequest(`http://localhost:3000/room/${roomId}`, "GET")
  const user = await authRequest("http://localhost:3000/user/read", "GET")

  return room && user && room.ownerId === user.userId
}

// storage.watch({
//   jwt: () => {
//     if (!checkJWT()) logout()
//   },
//   roomId: () => {
//     if (!checkRoom()) getRoomId()
//   }
// })