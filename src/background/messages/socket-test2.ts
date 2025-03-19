import type { PlasmoMessaging } from "@plasmohq/messaging"

import { socket } from "../socket"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("socket-test")
  socket.emit("events", "hello from extension22")
}

export default handler
