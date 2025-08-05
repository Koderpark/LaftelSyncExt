import { roomModule } from "~background/room"
import { updateVideo } from "~background/video"
import type { Room, VidData } from "~background/type"

export const connectHandler = async () => {
  console.log("connect")
}

export const roomUpdateHandler = async (body: Room) => {
  console.log("roomUpdateHandler", body)
  await roomModule.update(body)
}

export const videoHandler = (data: VidData) => {
  updateVideo(data)
}

export const disconnectHandler = async () => {
  console.log("disconnect")
  await roomModule.exit()
}