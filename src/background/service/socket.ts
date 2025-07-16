import io, { Socket } from "socket.io-client"
import { connectHandler, roomUpdateHandler, videoHandler } from "./handler"

export const socketModule = (() => {
  let instance: Socket | null = null

  const connect = async (
    type: "host" | "peer",
    name: string,
    roomId?: string,
    password?: string
  ) => {
    if (instance) await disconnect()
    instance = io("http://localhost:8081/", {
      transports: ["websocket"],
      reconnection: false,
      extraHeaders: {
        type,
        name,
        roomId,
        password
      }
    })
    callHandler()
  }

  const callHandler = () => {
    instance.on("connect", connectHandler)
    instance.on("roomUpdate", roomUpdateHandler)
    instance.on("video", videoHandler)
  }

  const disconnect = async () => {
    if (!instance) return
    await instance.disconnect()
    instance = null
  }

  const get = () => {
    if (!instance) throw new Error("Socket not initialized")
    return instance
  }

  const send = (event: string, data: any) => {
    if (!instance) throw new Error("Socket not initialized")
    instance.emit(event, data)
  }

  const sendRes = async (event: string, data: any) => {
    if (!instance) throw new Error("Socket not initialized")
    return await instance.emitWithAck(event, data)
  }

  return {
    connect,
    disconnect,
    get,
    send,
    sendRes
  }
})()
