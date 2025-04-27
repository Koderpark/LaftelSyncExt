import { useContext, useEffect } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "~popup/component/pill"
import { NotiContext } from "~popup/component/noti"
import { Content, Full } from "~popup/component/layout"
export default function SettingPopup(props) {
  const { Logout } = props
  const { openNoti } = useContext(NotiContext)
  const [roomId] = useStorage("roomId")
  const [isRoomOwner] = useStorage("isRoomOwner")

  const exit = async () => {
    const res = await sendToBackground({ name: "room", body: { msg: "exit" } })
    if (res) openNoti("Exit success", "success")
    else openNoti("Exit failed", "error")
  }

  const checkOwner = async () => {
    await sendToBackground({
      name: "room",
      body: { msg: "checkOwner" }
    })
  }

  useEffect(() => {
    checkOwner()
  }, [])

  return (
    <Full>
      <Content>
        <h1>this is setting page</h1>
        <PillBtn onClick={Logout}>Logout</PillBtn>
      </Content>
    </Full>
  )
}
