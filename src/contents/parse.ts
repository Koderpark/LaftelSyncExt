import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const config: PlasmoCSConfig = {
  matches: ["https://laftel.net/**"]
}

export const parse = async () => {
  const video = document.querySelector("video")
  if (!video) return

  const url = window.location.href
  const speed = video.playbackRate
  const time = video.currentTime
  const isPaused = video.paused

  const res = await sendToBackground({
    name: "video",
    body: { msg: "update", data: { url, speed, time, isPaused } }
  })

  return { url, speed, time, isPaused }
}

const changeHandler = async () => {
  const isRoomOwner = await storage.get("isRoomOwner")
  if (!isRoomOwner) return

  parse()
}

const vid = document.querySelector("video")

vid?.addEventListener("ratechange", changeHandler)
vid?.addEventListener("pause", changeHandler)
vid?.addEventListener("play", changeHandler)
vid?.addEventListener("canplay", changeHandler)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg == "parse") changeHandler()
})