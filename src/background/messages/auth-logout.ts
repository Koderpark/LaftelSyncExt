import type { PlasmoMessaging } from "@plasmohq/messaging"

import { logout } from "~background/auth"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await logout()
  res.send(message)
}

export default handler
