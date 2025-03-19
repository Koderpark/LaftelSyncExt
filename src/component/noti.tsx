import { createContext, useState } from "react"

const NotiContext = createContext(null)

type NotiType = "success" | "error" | "warning" | "info"

function Noti(props) {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [elem, setElem] = useState<React.ReactNode>(null)
  const [type, setType] = useState<NotiType>("info")

  const openNoti = async (elem: React.ReactNode, type: NotiType) => {
    setElem(elem)
    setType(type)
    setIsOpen(true)
    setTimeout(() => setIsOpen(false), 1500)
  }

  return (
    <NotiContext.Provider value={{ openNoti }}>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h1>{elem}</h1>
          </div>
        </div>
      )}
      {props.children}
    </NotiContext.Provider>
  )
}

export { Noti, NotiContext }
