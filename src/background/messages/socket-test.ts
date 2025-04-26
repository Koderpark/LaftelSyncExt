import type { PlasmoMessaging } from "@plasmohq/messaging"

import { send } from "../socket"
import { clientAlert } from "../index"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  clientAlert("socket test")
  send("events", "hello from extension")
}

export default handler
