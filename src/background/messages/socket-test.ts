import type { PlasmoMessaging } from "@plasmohq/messaging"

import { send } from "../socket"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  send("events", "hello from extension")
}

export default handler
