import type { PlasmoMessaging } from "@plasmohq/messaging"

import { checkJWT } from "~background/validate"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await checkJWT()
  res.send(message)
}

export default handler
