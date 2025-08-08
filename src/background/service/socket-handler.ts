import { roomModule } from "~background/room"
import { updateVideo } from "~background/video"
import type { Room, VidData } from "~background/const"
import { Storage } from "@plasmohq/storage"
import { logModule } from "./log"

const storage = new Storage()

export const connectHandler = async (id: string) => {
  logModule.devLog("connect")
  await storage.set("userId", id)
}

export const roomUpdateHandler = async (body: Room) => {
  logModule.devLog("roomUpdateHandler")
  await roomModule.update(body)
}

export const videoUpdateHandler = (data: VidData) => {
  logModule.devLog("videoUpdateHandler")
  updateVideo(data)
}

export const disconnectHandler = async () => {
  logModule.devLog("disconnect")
  await storage.set("userId", null)
  await roomModule.exit()
}