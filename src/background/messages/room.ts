import { createRoom, exitRoom, getRoomId, joinRoom } from "~background/room"
import type { PlasmoMessaging } from "@plasmohq/messaging"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body

  if (msg == "create") createHandler(req, res)
  if (msg == "join") joinHandler(req, res)
  if (msg == "exit") exitHandler(req, res)
  if (msg == "renew") renewHandler(req, res)
}

const createHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await createRoom(req.body.roomName)
  res.send(message)
}

const joinHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await joinRoom(req.body.roomId, req.body.roomPW)
  res.send(message)
}

const exitHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await exitRoom()
  res.send(message)
}

const renewHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await getRoomId()
  res.send(message)
}

export default handler
