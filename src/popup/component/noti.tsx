import { sendToBackground } from "@plasmohq/messaging"
import { createContext, useState } from "react"

const NotiContext = createContext(null)

type NotiType = "success" | "error" | "warning" | "info"
type MessageType = "auth" | "room" | "user" | "video"

const match = {
  success: "bg-green-400",
  error: "bg-red-400",
  warning: "bg-yellow-400",
  info: "bg-blue-400"
}

function NotiWrapper(props) {
  const { type, text } = props
  return (
    <div className="fixed bottom-0 right-0 flex items-center justify-center p-3">
      <div className={`w-full rounded-xl shadow-lg ${match[type]} px-6 py-3`}>
        <p className="text-lg font-bold">{text}</p>
      </div>
    </div>
  )
}

function Noti(props) {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [text, setText] = useState<string>("")
  const [type, setType] = useState<NotiType>("info")

  const openNoti = async (text: string, type: NotiType) => {
    setText(text)
    setType(type)
    setIsOpen(true)
    setTimeout(() => setIsOpen(false), 1500)
  }

  const message = async (to: string, content: any = {}) => {
    const name: MessageType = to.split("/")[0] as MessageType
    const msg: string = to.split("/")[1]

    const ret = await sendToBackground({
      name: name,
      body: { msg: msg, ...content }
    })
    return ret
  }

  return (
    <NotiContext.Provider value={{ openNoti, message }}>
      {isOpen && <NotiWrapper type={type} text={text} />}
      {props.children}
    </NotiContext.Provider>
  )
}

export { Noti, NotiContext }
