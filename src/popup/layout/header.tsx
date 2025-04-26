import { useStorage } from "@plasmohq/storage/hook"

const getHeaderTitle = () => {
  const [roomId] = useStorage("roomId")
  const [page] = useStorage("page")
  if (page == "login") return "LaftelSync 로그인"
  if (page == "room" && roomId) return "방"
  if (page == "room" && !roomId) return "방 선택"
  if (page == "setting") return "설정"
  return ""
}

export default function Header(props) {
  const { children } = props
  const [page] = useStorage("page")
  return (
    <div className="w-full h-14 flex items-center justify-between bg-gray-800 text-white px-4">
      <h1 className="text-2xl font-bold">{getHeaderTitle()}</h1>
      {children}
    </div>
  )
}
