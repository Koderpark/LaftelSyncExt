import { useContext, useEffect } from "react"
import { Pill } from "~popup/component/pill"
import { Content, Full } from "~popup/component/layout"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { Btn } from "~popup/component/button"
import { LuUser, LuCrown } from "react-icons/lu"
import { Label } from "~popup/component/label"
import { message } from "~popup/message"
import type { RoomMetadata } from "~background/type"

export default function RoomPopup(props) {
  const [room] = useStorage<RoomMetadata | null>("room")
  const [userId] = useStorage<string | null>("userId")

  const exit = async () => {
    await message("room/exit")
  }

  const isHost = room?.host === userId

  return (
    <Full>
      <Content>
        <div className="grow flex flex-col p-4 bg-gray-50 rounded-md text-gray-950 mb-4">
          <p className="font-bold text-gray-950 text-2xl">{room?.name}</p>
          <p className="text-sm text-gray-700">방 접속 ID : {room?.id}</p>

          <hr className="my-2" />

          <p className="font-bold text-gray-950 text-2xl mb-4">방 접속자</p>
          <div className="flex flex-col gap-2">
            {room?.user?.length == 0 && <p>방 접속자가 없습니다.</p>}
            {room?.user && room.user.map((user) => Peer(user, userId, isHost))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Btn label="방 나가기" onClick={exit} type="option" />
          <Btn
            label="디버그"
            onClick={() => {
              message("video/parse")
            }}
            type="option"
          />
        </div>
      </Content>
    </Full>
  )
}

function Peer(
  peer: RoomMetadata["user"][number],
  userId: string,
  isHost: boolean
) {
  const isMe = peer.id === userId

  const kickHandler = () => {
    message("room/kick", {
      id: peer.id
    })
  }

  return (
    <div key={peer.id} className="flex flex-row gap-2">
      <div className="w-5 h-5">
        {peer.isHost && <LuCrown className="w-full h-full" />}
        {!peer.isHost && <LuUser className="w-full h-full" />}
      </div>
      <p className="text-base text-gray-700">{peer.name}</p>
      <p className="text-sm text-gray-700">{isMe ? "나" : ""}</p>
      {isHost && !isMe && (
        <button className="text-sm text-red-500" onClick={kickHandler}>
          강퇴
        </button>
      )}
    </div>
  )
}
