import { useContext, useEffect } from "react"
import { Pill } from "~popup/component/pill"
import { Content, Full } from "~popup/component/layout"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { NotiContext } from "~popup/component/noti"
import { Btn } from "~popup/component/button"
import { LuUser, LuCrown } from "react-icons/lu"
import { Label } from "~popup/component/label"

export default function RoomPopup(props) {
  const { openNoti, message } = useContext(NotiContext)
  const [room] = useStorage("room")
  const [peers] = useStorage("peers")

  const exit = async () => {
    const res = await message("room/exit")
    if (res) openNoti("Exit success", "success")
    else openNoti("Exit failed", "error")
  }

  return (
    <Full>
      <Content>
        <div className="grow flex flex-col p-4 bg-gray-50 rounded-md text-gray-950 mb-4">
          <p className="font-bold text-gray-950 text-2xl">{room?.name}</p>
          <p className="text-sm text-gray-700">방 접속 ID : {room?.id}</p>

          <hr className="my-2" />

          <p className="font-bold text-gray-950 text-2xl mb-4">방 접속자</p>
          <div className="flex flex-col gap-2">
            {peers && peers.map((peer) => Peer(peer))}
          </div>
        </div>
        <Btn label="방 나가기" onClick={exit} type="option" />
      </Content>
    </Full>
  )
}

function Peer(peer) {
  return (
    <div key={peer.id} className="flex flex-row gap-2">
      <div className="w-5 h-5">
        {peer.isOwner && <LuCrown className="w-full h-full" />}
        {!peer.isOwner && <LuUser className="w-full h-full" />}
      </div>
      <p className="text-base text-gray-700">{peer.name}</p>
      {peer.isMe && <Label>me</Label>}
    </div>
  )
}
