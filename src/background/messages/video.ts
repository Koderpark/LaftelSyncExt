import { parseVideo } from "~background/video"
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { send } from "~background/socket"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body

  if (msg == "parse") parseHandler(req, res)
}

const parseHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  send("updateVid", await parseVideo())
}

export default handler
