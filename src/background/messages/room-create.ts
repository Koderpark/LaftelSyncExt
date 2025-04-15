import type { PlasmoMessaging } from "@plasmohq/messaging"

import { createRoom } from "~background/room"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await createRoom(req.body.roomName)
  res.send(message)
}

export default handler
