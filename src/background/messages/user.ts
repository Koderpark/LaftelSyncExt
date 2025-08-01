import type { PlasmoMessaging } from "@plasmohq/messaging"
import { userModule } from "~background/user"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body
  if (msg == "info") infoHandler(req, res)
}

const infoHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await userModule.get()
  res.send(message)
}

export default handler
