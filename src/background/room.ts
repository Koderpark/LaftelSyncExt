import { Storage } from "@plasmohq/storage"
import { exitSocket, shake } from "./socket"
import { authRequest } from "./auth"

const storage = new Storage()

export type roomType = {
  id: number
  ownerId: number
  cntViewer: number
  name: string
  vidName: string
  vidUrl: string
  vidEpisode: number
}

export type peerType = {
  id: number
  name: string
  isOwner: boolean
  isMe: boolean
}

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
  const room = await authRequest("http://localhost:3000/party", "POST", {
    name,
    password
  })
  const peers = await authRequest(`http://localhost:3000/party/peers`, "GET")

  await roomUpdate(room, peers)
  return true
}

/**
 * 방 나가기
 * @returns 방 나가기 성공 여부 (boolean)
 */
export async function exitRoom(): Promise<boolean> {
  console.log("exitRoom")
  await shake()
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
  id: number,
  password?: number
): Promise<boolean> {
  console.log("joinRoom")
  const room = await authRequest("http://localhost:3000/party/join", "POST", {
    id,
    password
  })
  const peers = await authRequest(`http://localhost:3000/party/peers`, "GET")

  await roomUpdate(room, peers)
  return true
}

export async function roomRenew(): Promise<boolean> {
  const room = await authRequest("http://localhost:3000/room/my", "GET")
  const peers = await authRequest(`http://localhost:3000/party/peers`, "GET")
  return await roomUpdate(room, peers)
}

export async function roomUpdate(
  room: roomType,
  peers: peerType[]
): Promise<boolean> {
  await storage.set("room", room)
  await storage.set("peers", peers)
  if (room) await shake()
  else await exitSocket()
  return true
}