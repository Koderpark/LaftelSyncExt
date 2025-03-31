import type { PlasmoMessaging } from "@plasmohq/messaging"

import { login } from "~background/auth"
import { getRoomId } from "~background/room"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { id, pw } = req.body
  const message = await login(id, pw)
  if (message) await getRoomId()
  res.send(message)
}

export default handler
