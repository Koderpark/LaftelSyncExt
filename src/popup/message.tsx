import { sendToBackground } from "@plasmohq/messaging"

type MessageType = "room" | "user" | "video" | "log" | "page"

export const message = async (to: string, content: any = {}) => {
  const name: MessageType = to.split("/")[0] as MessageType
  const msg: string = to.split("/")[1]
  const ret = await sendToBackground({
    name: name,
    body: { msg: msg, ...content }
  })
  return ret
}