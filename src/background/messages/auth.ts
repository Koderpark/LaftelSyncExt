import type { PlasmoMessaging } from "@plasmohq/messaging"
import { login, logout } from "~background/auth"
import { checkJWT } from "~background/validate"
import { getRoomId } from "~background/room"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body

  if (msg == "login") loginHandler(req, res)
  if (msg == "logout") logoutHandler(req, res)
  if (msg == "validate") validateHandler(req, res)
}

const loginHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { id, pw } = req.body
  const message = await login(id, pw)
  if (message) await getRoomId()
  res.send(message)
}

const logoutHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await logout()
  res.send(message)
}

const validateHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await checkJWT()
  res.send(message)
}

export default handler
