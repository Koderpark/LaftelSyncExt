import io from "socket.io-client"
import { Storage } from "@plasmohq/storage"
import { updateVideo, type VideoData } from "./video"
import { clientAlert } from "./index"
const storage = new Storage()
const socket = io("http://localhost:8081/", {
  transports: ["websocket"],
  reconnection: false,
  autoConnect: false
})

export const shake = async () => {
  if (socket.connected) return -1
  socket.auth = { token: await storage.get("jwt") }

  await socket.connect()

  if (!socket.connected) return -1
  return 1
}

export const exitSocket = async () => {
  if (!socket.connected) return
  await socket.disconnect()
}

export const send = async (event: string, data: any) => {
  if (!socket.connected) await shake()
  socket.emit(event, data)
}

export const sendRes = async (event: string, data: any) => {
  if (!socket.connected) await shake()
  const ret = await socket.emitWithAck(event, data)
  return ret
}

socket.on("connect", async () => {})

socket.on("updateVid", (data: VideoData) => {
  clientAlert("get socket")
  updateVideo(data)
})
