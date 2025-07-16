import { parseVideo } from "../video"
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { send } from "../service/socket"
import { clientAlert } from "../index"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body

  if (msg == "parse") parseHandler(req, res)
  if (msg == "update") updateHandler(req, res)
}

const parseHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  parseVideo()
}

const updateHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  send("video", req.body.data)
}

export default handler
