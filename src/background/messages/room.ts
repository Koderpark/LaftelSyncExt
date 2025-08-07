import { roomModule } from "~background/room"
import type { PlasmoMessaging } from "@plasmohq/messaging"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body
  if (msg == "create") createHandler(req, res)
  if (msg == "join") joinHandler(req, res)
  if (msg == "exit") exitHandler(req, res)
  if (msg == "kick") kickHandler(req, res)
}

const createHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await roomModule.create(req.body.name, req.body.password)
  res.send(message)
}

const joinHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await roomModule.join(req.body.roomId, req.body.password)
  res.send(message)
}

const exitHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await roomModule.exit()
  res.send(message)
}

const kickHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await roomModule.kick(req.body.id)
  res.send(message)
}


export default handler
