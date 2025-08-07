import { Storage } from "@plasmohq/storage"
import { Request } from "./auth"
import type { Room } from "./type"
import { socketModule } from "./service/socket"

const storage = new Storage()

export const roomModule = (() => {
  const create = async (name: string, password?: string) => {
    await socketModule.connectHost(name, password)
  }

  const join = async (roomId: string, password?: string) => {
    await socketModule.connectPeer(roomId, password)
  }

  const exit = async () => {
    await socketModule.disconnect()
    await storage.set("room", null)
  }

  const update = async (room: Room) => {
    if (room === null) return exit()
    await storage.set("room", room)
  }

  const kick = async (id: string) => {
    await socketModule.send("room/kick", { userId: id })
  }

  return {
    create,
    join,
    exit,
    update,
    kick
  }
})()

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

  await roomModule.update(room)
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
  await roomModule.update(room)
  return true
}