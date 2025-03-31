import { useContext } from "react"
import { NotiContext, Pill } from "~component"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
export default function Room() {
  const { openNoti } = useContext(NotiContext)
  const [roomId] = useStorage("roomId")

  const exit = async () => {
    const res = await sendToBackground({ name: "room-exit" })
    if (res) openNoti("Exit success", "success")
    else openNoti("Exit failed", "error")
  }

  return (
    <div>
      <h1>Room {roomId}</h1>
      <button onClick={() => openNoti("hello", "info")}>Open Noti</button>
      <button onClick={() => sendToBackground({ name: "socket-test" })}>
        Socket Test
      </button>
      <Pill>
        <button onClick={() => exit()}>Exit</button>
      </Pill>
    </div>
  )
}
