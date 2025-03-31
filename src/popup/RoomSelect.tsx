import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"
import { Pill } from "~component"

export default function RoomSelect() {
  const [roomId, setRoomId] = useState("")
  const [roomName, setRoomName] = useState("")

  const submitJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // sendToBackground({
    //   name: "room-join",
    //   body: { roomId }
    // })
  }

  const submitCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    sendToBackground({
      name: "room-create",
      body: { roomName }
    })
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
        <button type="submit" onClick={submitJoin}>
          Join
        </button>
      </form>
      or
      <form>
        <input
          type="text"
          placeholder="Room Name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Pill>
          <button type="submit" onClick={submitCreate}>
            Create
          </button>
        </Pill>
      </form>
    </div>
  )
}
