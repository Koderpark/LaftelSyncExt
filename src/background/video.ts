export type VideoData = {
  url: string
  speed: number
  time: number
  isPaused: boolean
}

export const parseVideo = async (): Promise<VideoData> => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true })
  const ret = await chrome.scripting.executeScript({
    target: { tabId: tab[0].id },
    func: () => {
      const video = document.querySelector("video")
      if (!video) return

      const url = window.location.href
      const speed = video.playbackRate
      const time = video.currentTime
      const isPaused = video.paused

      return { url, speed, time, isPaused }
    }
  })
  return ret[0].result
}

export const updateVideo = async (data: VideoData) => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true })
  const ret = await chrome.scripting.executeScript({
    target: { tabId: tab[0].id },
    func: (data: VideoData) => {
      const { url, speed, time, isPaused } = data

      if (url != window.location.href) {
        window.location.href = url
      }

      const video = document.querySelector("video")
      if (!video) return

      video.playbackRate = speed
      video.currentTime = time

      if (isPaused) video.pause()
      else video.play()
    },
    args: [data]
  })
}
