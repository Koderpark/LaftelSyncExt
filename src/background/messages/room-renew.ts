import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getRoomId } from "~background/room"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await getRoomId()
  res.send(message)
}

export default handler
