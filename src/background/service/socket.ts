import io, { Socket } from "socket.io-client"
import { Storage } from "@plasmohq/storage"
import { updateVideo } from "../video"
import { clientAlert } from "../index"
import { roomUpdate } from "../room"
import type { Room, VidData } from "../type"
import { connectHandler, roomUpdateHandler, videoHandler } from "./handler"
const storage = new Storage()

const SingletonSocket = (() => {
  let instance: Socket | null = null

  const connect = async (type: "host" | "peer", name: string, roomId?: string, password?: string) => {
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
    if(!instance) return;
    await instance.disconnect()
    instance = null
  }

  const get = () => {
    if (!instance) throw new Error("Socket not initialized")
    return instance
  }

  const send = (event: string, data: any) => {
    if(!instance) throw new Error("Socket not initialized")
    instance.emit(event, data)
  }

  const sendRes = (event: string, data: any) => {
    if(!instance) throw new Error("Socket not initialized")
    return instance.emitWithAck(event, data)
  }

  return {
    connect,
    disconnect,
    get,
    send,
    sendRes
  }
})();