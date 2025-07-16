import { Storage } from "@plasmohq/storage"
import { Request } from "./auth"
import type { Room } from "./type"

const storage = new Storage()

/**
 * 방 생성
 * @param roomName 방 이름
 * @param roomPW 방 비밀번호
 * @returns 방 생성 성공 여부 (boolean)
 */
export async function createRoom(
  name: string,
  password: string
): Promise<boolean> {
  console.log("createRoom")
  await Request("http://localhost:3000/party/create", "POST", {
    name,
    password
  })
  const room = await Request(`http://localhost:3000/room/status`, "GET")

  await roomUpdate(room)
  return true
}

/**
 * 방 나가기
 * @returns 방 나가기 성공 여부 (boolean)
 */
export async function exitRoom(): Promise<boolean> {
  console.log("exitRoom")
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
  id: number,
  password?: number
): Promise<boolean> {
  console.log("joinRoom")
  await Request("http://localhost:3000/party/join", "POST", {
    id,
    password
  })

  const room = await Request(`http://localhost:3000/room/status`, "GET")
  await roomUpdate(room)
  return true
}

export async function roomRenew(): Promise<boolean> {
  const room = await Request("http://localhost:3000/room/my", "GET")
  return await roomUpdate(room)
}

export async function roomUpdate(room: Room): Promise<boolean> {
  await storage.set("room", room)
  return true
}
