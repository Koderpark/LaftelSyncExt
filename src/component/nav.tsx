import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "./pill"

export default function Navbar() {
  const [page, setPage] = useStorage("page")
  const [roomId] = useStorage("roomId")
  const changePage = (page: "room" | "setting") => {
    setPage(page)
  }

  return (
    <div className="w-full h-14 flex items-center justify-between bg-gray-800 text-white px-4">
      {roomId && (
        <PillBtn isActive={page == "room"} onClick={() => changePage("room")}>
          room
        </PillBtn>
      )}
      {!roomId && (
        <PillBtn isActive={page == "room"} onClick={() => changePage("room")}>
          room
        </PillBtn>
      )}
      <PillBtn
        isActive={page == "setting"}
        onClick={() => changePage("setting")}>
        setting
      </PillBtn>
    </div>
  )
}
