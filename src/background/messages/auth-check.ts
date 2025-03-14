import type { PlasmoMessaging } from "@plasmohq/messaging"

import { isLoggedIn } from "~background/auth"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await isLoggedIn()
  res.send(message)
}

export default handler
