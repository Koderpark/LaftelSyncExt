import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "../component/pill"

export default function Navbar() {
  const [page, setPage] = useStorage("page")
  const [roomId] = useStorage("roomId")
  const changePage = (page: "room" | "setting" | "main") => {
    setPage(page)
  }

  return (
    <div>
      {page != "login" && (
        <div className="w-full h-16 flex items-center justify-between bg-gray-800 text-white px-4">
          <PillBtn isActive={page == "main"} onClick={() => changePage("main")}>
            {roomId ? "방 설정" : "방 생성/가입"}
          </PillBtn>
          <PillBtn
            isActive={page == "setting"}
            onClick={() => changePage("setting")}>
            설정
          </PillBtn>
        </div>
      )}
    </div>
  )
}
