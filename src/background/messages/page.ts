import type { PlasmoMessaging } from "@plasmohq/messaging"
import { modifyTab, newTab } from "~background/page"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body
  if (msg == "newTab") newTabHandler(req, res)
  if (msg == "modifyTab") modifyTabHandler(req, res)
}

const newTabHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { url } = req.body
  await newTab(url)
  res.send(true)
}

const modifyTabHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { url } = req.body
  await modifyTab(url)
  res.send(true)
}

export default handler
