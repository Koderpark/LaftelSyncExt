export type VideoData = {
  url: string
  speed: number
  time: number
  isPaused: boolean
}

/**
 * 비디오 파싱
 */
export const parseVideo = async (): Promise<void> => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true })
  await chrome.tabs.sendMessage(tab[0].id, { msg: "parse" })
}

/**
 * 비디오 업데이트
 * @param data 비디오 데이터
 */
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
