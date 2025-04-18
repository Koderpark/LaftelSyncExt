import type { PlasmoMessaging } from "@plasmohq/messaging"
import { send } from "../socket"

const parseVideo = () => {
  const video = document.querySelector("video")
  if (!video) return

  const url = window.location.href
  const speed = video.playbackRate
  const time = video.currentTime
  const isPaused = video.paused

  return JSON.stringify({ url, speed, time, isPaused })
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true })
  const ret = await chrome.scripting.executeScript({
    target: { tabId: tab[0].id },
    func: parseVideo
  })
  send("updateVid", ret[0].result)
}

export default handler
