import type { PlasmoMessaging } from "@plasmohq/messaging"

import { login } from "~background/auth"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { id, pw } = req.body
  const message = await login(id, pw)
  res.send(message)
}

export default handler
