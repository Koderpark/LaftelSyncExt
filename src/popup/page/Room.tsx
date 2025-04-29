import { useContext, useEffect } from "react"
import { Pill } from "~popup/component/pill"
import { Content, Full } from "~popup/component/layout"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { NotiContext } from "~popup/component/noti"

export default function RoomPopup(props) {
  const { openNoti, message } = useContext(NotiContext)
  const [roomId] = useStorage("roomId")
  const [isRoomOwner] = useStorage("isRoomOwner")

  const exit = async () => {
    const res = await message("room/exit")
    if (res) openNoti("Exit success", "success")
    else openNoti("Exit failed", "error")
  }

  return (
    <Full>
      <Content>
        <h1>Room {roomId}</h1>
        {isRoomOwner && <h1>you are owner of this room</h1>}
        {!isRoomOwner && <h1>you are not owner of this room</h1>}

        <button onClick={() => openNoti("hello", "info")}>Open Noti</button>
        <button onClick={() => sendToBackground({ name: "socket-test" })}>
          Socket Test
        </button>
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
