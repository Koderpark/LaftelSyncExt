import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoCSConfig } from "plasmo"

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

const changeHandler = async () => {
  // const room = JSON.parse(await storage.get("room"))
  // if (!room?.isOwner) return
  parseVideo()
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

  const titleBox = document.querySelector(
    "#root > div:nth-child(2) > div > div:nth-child(2) > div"
  )

  const title = titleBox?.querySelector("a")?.textContent
  const episode = titleBox?.querySelector(
    "div div div:first-child"
  )?.textContent

  const url = window.location.href
  const speed = video.playbackRate
  const time = video.currentTime
  const isPaused = video.paused

  console.log("parsing", { title, episode, url, speed, time, isPaused })

  const res = await sendToBackground({
    name: "video",
    body: {
      msg: "update",
      data: { title, episode, url, speed, time, isPaused }
    }
  })

  return { title, episode, url, speed, time, isPaused }
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg == "parse") changeHandler()
})