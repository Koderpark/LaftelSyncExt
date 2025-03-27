import type { PlasmoMessaging } from "@plasmohq/messaging"

import { shake, socket } from "../socket"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  shake()
  console.log("socket-test")
  socket.emit("events", "hello from extension")
}

export default handler
