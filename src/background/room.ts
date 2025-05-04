import { Storage } from "@plasmohq/storage"
import { exitSocket, shake } from "./socket"
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
  await authRequest("http://localhost:3000/room", "POST", {
    roomName,
    password: roomPW
  })

  await roomRenew()
  await shake()
  return true
}

/**
 * 방 나가기
 * @returns 방 나가기 성공 여부 (boolean)
 */
export async function exitRoom(): Promise<boolean> {
  console.log("exitRoom")
  await exitSocket()
  await storage.set("room", null)
  await storage.set("peers", null)
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
  const ret = await authRequest("http://localhost:3000/room/join", "POST", {
    roomId: roomId,
    password: roomPW
  })

  await roomRenew()
  await shake()
  return true
}

export async function roomRenew(): Promise<boolean> {
  console.log("roomRenew")
  const room = await authRequest("http://localhost:3000/room/my", "GET")
  const peers = await authRequest(`http://localhost:3000/room/peers`, "GET")

  await storage.set("room", room)
  await storage.set("peers", peers)
  if (room) await shake()
  return true
}