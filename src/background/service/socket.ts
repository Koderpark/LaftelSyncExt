import io, { Socket } from "socket.io-client"
import {
  connectHandler,
  disconnectHandler,
  roomUpdateHandler,
  videoHandler
} from "./socket-handler"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const socketModule = (() => {
  let instance: Socket | null = null

  const connectHost = async (name: string, password?: string) => {
    if (instance) await disconnect()
    instance = io("http://localhost:8081/", {
      transports: ["websocket"],
      reconnection: false,
      auth: {
        type: "host",
        username: await storage.get("username"),
        name,
        password
      }
    })
    handler()
  }

  const connectPeer = async (roomId: string, password?: string) => {
    if (instance) await disconnect()
    instance = io("http://localhost:8081/", {
      transports: ["websocket"],
      reconnection: false,
      auth: {
        type: "peer",
        username: await storage.get("username"),
        roomId,
        password
      }
    })
    handler()
  }

  const handler = () => {
    if (!instance) return
    instance.on("connect", connectHandler)
    instance.on("roomChanged", roomUpdateHandler)
    instance.on("video", videoHandler)
    instance.on("disconnect", disconnectHandler)
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
    connectHost,
    connectPeer,
    disconnect,
    get,
    send,
    sendRes
  }
})()
