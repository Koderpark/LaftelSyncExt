import * as room from "./room"
import * as validate from "./validate"
import * as auth from "./auth"
import * as socket from "./service/socket"
import * as page from "./service/page"

export async function clientAlert(msg: string) {
  const currtab = await chrome.tabs.query({ active: true, currentWindow: true })
  chrome.scripting.executeScript({
    target: { tabId: currtab[0].id },
    args: [msg],
    func: (msg) => {
      alert(JSON.stringify(msg))
    }
  })
}

export { room, validate, auth, socket, page }
