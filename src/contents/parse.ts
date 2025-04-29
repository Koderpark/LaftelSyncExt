import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const config: PlasmoCSConfig = {
  matches: ["https://laftel.net/player/*"]
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
  const room = JSON.parse(await storage.get("room"))
  if (!room?.isOwner) return
  parse()
}

window.addEventListener("load", () => {
  alert("loaded")

  const vid = document.querySelector("video")
  vid?.addEventListener("canplay", changeHandler)
  vid?.addEventListener("ratechange", changeHandler)
  vid?.addEventListener("pause", changeHandler)
  vid?.addEventListener("play", changeHandler)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg == "parse") changeHandler()
})