import type { PlasmoMessaging } from "@plasmohq/messaging"

import { joinRoom } from "~background/room"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await joinRoom(req.body.roomId)
  res.send(message)
}

export default handler
