import type { PlasmoMessaging } from "@plasmohq/messaging"
import { DisplayLog, RaiseError } from "~background/service/log"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body
  if (msg == "success") await testHandler(req, res)
  if (msg == "error") await errorHandler(req, res)
  else res.send({ status: "ignored" }) // todo: return type definition
}

const testHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { text } = req.body
  await DisplayLog(text)
  res.send({ status: "ok" })
}

const errorHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { text } = req.body
  await RaiseError(text)
  res.send({ status: "ok" })
}

export default handler
