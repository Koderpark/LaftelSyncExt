import { createContext, useState } from "react"

const NotiContext = createContext(null)

type NotiType = "success" | "error" | "warning" | "info"

const match = {
  success: "bg-green-300",
  error: "bg-red-300",
  warning: "bg-yellow-300",
  info: "bg-blue-300"
}

function NotiWrapper(props) {
  const { type, text } = props
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center p-3">
      <div className={`w-full rounded-xl shadow-lg ${match[type]} p-3`}>
        <p className="text-lg">{text}</p>
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

  return (
    <NotiContext.Provider value={{ openNoti }}>
      {isOpen && <NotiWrapper type={type} text={text} />}
      {props.children}
    </NotiContext.Provider>
  )
}

export { Noti, NotiContext }
