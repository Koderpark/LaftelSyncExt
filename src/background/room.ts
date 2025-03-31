import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export async function getRoomId(): Promise<number | null> {
  const jwt = await storage.get("jwt")
  if (!jwt) return null

  const ret = await fetch("http://localhost:3000/room/my", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    }
  })

  if (ret.status === 200) {
    const roomId = ret.json()["roomId"]
    await storage.set("roomId", roomId)
    return roomId
  }
  return null
}

export async function createRoom(roomName: string): Promise<void> {
  console.log("createRoom", roomName)
  const jwt = await storage.get("jwt")
  if (!jwt) return

  const ret = await fetch("http://localhost:3000/room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({ roomName })
  })

  console.log("createRoom", ret)

  if (ret.status === 201) {
    const roomId = JSON.parse(await ret.text())["roomId"]
    console.log("room created", roomId)
    await storage.set("roomId", roomId)
  }
}

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

  if (ret.status === 201) {
    await storage.set("roomId", -1)
  }
  return ret.status === 201
}
