import type { PlasmoMessaging } from "@plasmohq/messaging"
import { DisplayLog } from "~background/service/log"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body
  if (msg == "test") await testHandler(req, res)
  else res.send({ status: "ignored" })
}

const testHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { text } = req.body
  await DisplayLog(text)
  res.send({ status: "ok" })
}

export default handler
