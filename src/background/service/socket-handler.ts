import { roomModule } from "~background/room"
import { updateVideo } from "~background/video"
import type { Room, VidData } from "~background/const"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const connectHandler = async (id: string) => {
  console.log("connect")
  await storage.set("userId", id)
}

export const roomUpdateHandler = async (body: Room) => {
  console.log("roomUpdateHandler", body)
  await roomModule.update(body)
}

export const videoUpdateHandler = (data: VidData) => {
  console.log("videoUpdateHandler", data)
  updateVideo(data)
}

export const disconnectHandler = async () => {
  console.log("disconnect")
  await storage.set("userId", null)
  await roomModule.exit()
}