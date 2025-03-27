import io from "socket.io-client"
import { Storage } from "@plasmohq/storage"
import { checkJWT } from "./validate"

const storage = new Storage()
const socket = io("http://localhost:8081/", {
  transports: ["websocket"],
  reconnection: false,
  autoConnect: false
})

const shake = async () => {
  if (socket.connected) socket.disconnect()

  socket.auth = { token: await storage.get("jwt") }
  await socket.connect()

  const ret = await socket.emit("currentRoom")
  return 1
}

const send = async (event: string, data: any) => {
  if (!socket.connected) await shake()
  socket.emit(event, data)
}

socket.on("connect_error", (error) => {
  console.log(error)
})

socket.on("connect", () => {
  console.log("connected")
})

export { socket, shake }
