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
  await shake()
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
  console.log("createRoom")
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await authRequest("http://localhost:3000/room", "POST", {
    roomName,
    password: roomPW
  })

  if (!ret) return false

  const room = ret
  await storage.set("room", room)
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
  await storage.set("room", ret)
  await shake()
  return true
}

/**
 * 방 참가자 목록 조회
 * @returns 방 참가자 목록 조회 성공 여부 (boolean)
 */
export async function roomPeers(): Promise<boolean> {
  console.log("roomPeers")
  const room: roomType = await storage.get("room")
  if (!room) return false

  const ret = await authRequest(
    `http://localhost:3000/room/${room.id}/peers`,
    "GET"
  )
  if (!ret) return false

  await storage.set("peers", ret)
  return true
}