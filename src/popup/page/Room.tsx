import { useContext, useEffect } from "react"
import { Pill } from "~popup/component/pill"
import { Content, Full } from "~popup/component/layout"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { NotiContext } from "~popup/component/noti"

export default function RoomPopup(props) {
  const { openNoti, message } = useContext(NotiContext)
  const [room] = useStorage("room")

  const exit = async () => {
    const res = await message("room/exit")
    if (res) openNoti("Exit success", "success")
    else openNoti("Exit failed", "error")
  }

  return (
    <Full>
      <Content>
        <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-md text-gray-950">
          <h1 className="font-bold text-2xl">
            {room?.name}[{room?.id}]
          </h1>
          {room?.isOwner && <h1>you are owner of this room</h1>}
          {!room?.isOwner && <h1>you are not owner of this room</h1>}
        </div>

        <button onClick={() => openNoti("hello", "info")}>Open Noti</button>
        <Pill>
          <button onClick={() => exit()}>Exit</button>
        </Pill>
        <div>
          <button onClick={() => openNoti("hello", "info")}>Open Noti</button>
          <button
            onClick={() =>
              sendToBackground({ name: "video", body: { msg: "parse" } })
            }>
            parse video
          </button>
        </div>
      </Content>
    </Full>
  )
}
