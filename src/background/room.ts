import { Storage } from "@plasmohq/storage"
import { exitSocket } from "./socket"
import { checkRoomOwner } from "./validate"
import { authRequest } from "./auth"

const storage = new Storage()

/**
 * 방 아이디 업데이트
 * @returns 방 아이디 업데이트 성공 여부 (boolean)
 */
export async function getRoomId(): Promise<boolean> {
  console.log("getRoomId")
  const jwt = await storage.get("jwt")
  if (!jwt) {
    await storage.set("room", null)
    return false
  }

  const ret = await authRequest("http://localhost:3000/room/my", "GET")
  if (!ret) {
    await storage.set("room", null)
    return false
  }

  await storage.set("room", ret)
  return true
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
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await authRequest("http://localhost:3000/room", "POST", {
    roomName,
    password: roomPW
  })

  if (!ret) return false

  const room = ret
  await storage.set("room", room)
  return true
}

/**
 * 방 나가기
 * @returns 방 나가기 성공 여부 (boolean)
 */
export async function exitRoom(): Promise<boolean> {
  await exitSocket()
  await storage.set("room", null)
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
  roomPW?: string
): Promise<boolean> {
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await authRequest("http://localhost:3000/room/join", "POST", {
    roomId: roomId,
    password: roomPW
  })

  if (!ret) return false

  const room = JSON.parse(await ret.text())
  await storage.set("room", room)
  return true
}