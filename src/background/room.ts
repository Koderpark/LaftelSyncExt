import { Storage } from "@plasmohq/storage"
import { exitSocket, shake } from "./socket"
import { checkRoomOwner } from "./validate"
import { authRequest } from "./auth"

const storage = new Storage()

type roomType = {
  id: number
  cntViewer: number
  isOwner: boolean
  name: string
}

/**
 * 방 생성
 * @param roomName 방 이름
 * @param roomPW 방 비밀번호
 * @returns 방 생성 성공 여부 (boolean)
 */
export async function createRoom(
  roomName: string,
  roomPW: string
): Promise<boolean> {
  console.log("createRoom")
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const room = await authRequest("http://localhost:3000/room", "POST", {
    roomName,
    password: roomPW
  })
  if (!room) return false

  await roomRenew()
  return true
}

/**
 * 방 나가기
 * @returns 방 나가기 성공 여부 (boolean)
 */
export async function exitRoom(): Promise<boolean> {
  console.log("exitRoom")
  await exitSocket()
  await clearRoom()
  return true
}

/**
 * 방 참가
 * @param roomId 방 아이디
 * @param roomPW 방 비밀번호
 * @returns 방 참가 성공 여부 (boolean)
 */
export async function joinRoom(
  roomId: number,
  roomPW?: number
): Promise<boolean> {
  console.log("joinRoom")
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await authRequest("http://localhost:3000/room/join", "POST", {
    roomId: roomId,
    password: roomPW
  })

  if (!ret) return false
  await roomRenew()
  await shake()
  return true
}

export async function roomRenew(): Promise<boolean> {
  console.log("roomRenew")

  const room = await authRequest("http://localhost:3000/room/my", "GET")
  if (!room) {
    await clearRoom()
    return false
  }
  const peers = await authRequest(
    `http://localhost:3000/room/${room.id}/peers`,
    "GET"
  )
  if (!peers) {
    await clearRoom()
    return false
  }

  await storage.set("room", room)
  await storage.set("peers", peers)
  await shake()
  return true
}

export async function clearRoom(): Promise<boolean> {
  console.log("clearRoom")
  await storage.set("room", null)
  await storage.set("peers", null)
  return true
}
