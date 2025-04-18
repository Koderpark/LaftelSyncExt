import io from "socket.io-client"
import { Storage } from "@plasmohq/storage"

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

const modifyVideo = (
  url: string,
  speed: number,
  time: number,
  isPaused: boolean
) => {
  if (url != window.location.href) {
    window.location.href = url
  }

  const video = document.querySelector("video")
  if (!video) return

  video.playbackRate = speed
  video.currentTime = time

  if (isPaused) video.pause()
  else video.play()

  console.log(url, speed, time, isPaused)
}

socket.on("connect", async () => {})

socket.on("updateVid", async (data: any) => {
  const { url, speed, time, isPaused } = JSON.parse(data)
  console.log(data)
  console.log("updateVid", url, speed, time, isPaused)

  const tab = await chrome.tabs.query({ active: true, currentWindow: true })
  const ret = await chrome.scripting.executeScript({
    target: { tabId: tab[0].id },
    func: modifyVideo,
    args: [url, speed, time, isPaused]
  })
})
