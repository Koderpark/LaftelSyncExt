import type { PlasmoMessaging } from "@plasmohq/messaging"

import { validateJWT } from "~background/auth"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { jwt } = req.body
  const message = await validateJWT(jwt)
  res.send(message)
}

export default handler
