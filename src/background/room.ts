import { Storage } from "@plasmohq/storage"
import { exitSocket } from "./socket"
import { checkRoomOwner } from "./validate"

const storage = new Storage()

/**
 * 방 아이디 업데이트
 * @returns 방 아이디 업데이트 성공 여부 (boolean)
 */
export async function getRoomId(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  if (!jwt) {
    await storage.set("roomId", -1)
    return false
  }

  const ret = await fetch("http://localhost:3000/room/my", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    }
  })
  if (ret.status !== 200) {
    await storage.set("roomId", -1)
    return false
  }

  const roomId = ret.json()["roomId"]
  await storage.set("roomId", roomId)
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

  const ret = await fetch("http://localhost:3000/room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({ roomName, password: roomPW })
  })

  if (ret.status !== 201) return false

  const roomId = JSON.parse(await ret.text())["roomId"]
  await storage.set("roomId", roomId)
  await storage.set("isRoomOwner", true)
  return true
}

/**
 * 방 나가기
 * @returns 방 나가기 성공 여부 (boolean)
 */
export async function exitRoom(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await fetch("http://localhost:3000/room/exit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    }
  })

  if (ret.status !== 201) return false

  await exitSocket()
  await storage.set("roomId", -1)
  await storage.set("isRoomOwner", false)
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

  const ret = await fetch("http://localhost:3000/room/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({ roomId: roomId, password: roomPW })
  })

  if (ret.status !== 201) return false

  await storage.set("roomId", roomId)
  await storage.set("isRoomOwner", false)
  return true
}