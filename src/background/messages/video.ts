import { parseVideo } from "~background/video"
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { send } from "~background/socket"
import { clientAlert } from "~background/index"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body

  if (msg == "parse") parseHandler(req, res)
  if (msg == "test") testHandler(req, res)
}

const parseHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  send("updateVid", await parseVideo())
}

const testHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  send("updateVid", req.body.data)
}

export default handler
