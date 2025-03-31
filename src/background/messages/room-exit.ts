import type { PlasmoMessaging } from "@plasmohq/messaging"

import { exitRoom } from "~background/room"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await exitRoom()
  res.send(message)
}

export default handler
