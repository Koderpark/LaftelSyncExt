import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "../component/pill"
import { LuDoorOpen, LuMessageSquare, LuSettings } from "react-icons/lu"
export default function Navbar() {
  const [page, setPage] = useStorage("page")
  const [room] = useStorage("room")

  const isLogin = page != "login"

  return (
    <div>
      {isLogin && (
        <div className="w-full h-16 flex items-center justify-between bg-gray-800 text-white px-4 shadow-md">
          <PillBtn isActive={page == "main"} onClick={() => setPage("main")}>
            <LuDoorOpen className="w-5 h-5" />
            <p className="text-sm">{room ? "방 설정" : "방 접속"}</p>
          </PillBtn>
          <PillBtn isActive={page == "chat"} onClick={() => setPage("chat")}>
            <LuMessageSquare className="w-5 h-5" />
            <p className="text-sm">채팅</p>
          </PillBtn>
          <PillBtn
            isActive={page == "setting"}
            onClick={() => setPage("setting")}>
            <LuSettings className="w-5 h-5" />
            <p className="text-sm">설정</p>
          </PillBtn>
        </div>
      )}
    </div>
  )
}
