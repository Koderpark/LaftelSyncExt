import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"

export default function RoomSelect() {
  const [roomId, setRoomId] = useState("")

  const submit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // sendToBackground({
    //   name: "room-join",
    //   body: { roomId }
    // })
  }

  return (
    <div>
      <h1>Room Select</h1>
      <form>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button type="submit" onClick={submit}>
          Join
        </button>
      </form>
    </div>
  )
}
