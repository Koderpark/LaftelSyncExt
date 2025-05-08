import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const config: PlasmoCSConfig = {
  matches: ["https://laftel.net/*"]
}

const SPAobserver = () => {
  let beforeUrl = window.location.href
  const observer = new MutationObserver((mutations) => {
    if (beforeUrl != window.location.href) {
      beforeUrl = window.location.href
      pageLoaded()
    }
  })
  observer.observe(document.documentElement, { childList: true, subtree: true })
}

const pageLoaded = () => {
  console.log("page Loaded")
  const vid = document.querySelector("video")

  vid?.addEventListener("canplay", changeHandler)
  vid?.addEventListener("ratechange", changeHandler)
  vid?.addEventListener("pause", changeHandler)
  vid?.addEventListener("play", changeHandler)
}

SPAobserver()
pageLoaded()

export const parseVideo = async () => {
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

// export const parseMetadata = async () => {
//   const title = document.querySelector("h1.title")
//   if (!title) return

//   const titleText = title.textContent
//   const res = await sendToBackground({
//     name: "metadata",
//     body: { msg: "update", data: { title: titleText } }
//   })
// }

const changeHandler = async () => {
  // const room = JSON.parse(await storage.get("room"))
  // if (!room?.isOwner) return
  parseVideo()
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg == "parse") changeHandler()
})