import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://laftel.net/*"]
}

window.addEventListener("load", () => {
  // alert("content script loaded")
})
