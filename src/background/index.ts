// import * as room from "./room"
// import * as validate from "./validate"
// import * as auth from "./auth"
import * as socket from "./service/socket"
import * as page from "./service/page"

export { socket, page }

import { Storage } from "@plasmohq/storage"

const storage = new Storage()
storage.watch({
  room: (c) => {
    chrome.action.setBadgeText({
      text: c.newValue ? "🔴" : ""
    })
  }
})

chrome.action.setBadgeText({
  text: ""
})