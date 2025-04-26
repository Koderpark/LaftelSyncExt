import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoCSConfig } from "plasmo"

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

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    parse()
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg == "parse") parse()
})
