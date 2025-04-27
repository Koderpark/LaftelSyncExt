import { useContext, useEffect } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "~popup/component/pill"
import { NotiContext } from "~popup/component/noti"
import { Content, Full } from "~popup/component/layout"

export default function SettingPopup(props) {
  const { Logout } = props
  const { openNoti, message } = useContext(NotiContext)
  const [roomId] = useStorage("roomId")
  const [isRoomOwner] = useStorage("isRoomOwner")

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await message("auth/logout")
    if (res) openNoti("로그아웃 성공", "success")
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
        <PillBtn onClick={handleLogout}>Logout</PillBtn>
      </Content>
    </Full>
  )
}
