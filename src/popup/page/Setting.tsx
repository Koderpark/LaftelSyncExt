import { useContext, useEffect } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "~popup/component/pill"
import { NotiContext } from "~popup/component/noti"
import { Content, Full } from "~popup/component/layout"
import { Btn } from "~popup/component/button"

export default function SettingPopup(props) {
  const { openNoti, message } = useContext(NotiContext)

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await message("auth/logout")
    if (res) openNoti("로그아웃 성공", "success")
  }

  useEffect(() => {
    message("room/checkOwner")
  }, [])

  return (
    <Full>
      <Content>
        <Full>
          <h1>this is setting page</h1>
        </Full>
        <div className="flex flex-col gap-2">
          <Btn label="Logout" onClick={handleLogout} type="option" />
          <Btn label="Logout" onClick={handleLogout} type="option" />
        </div>
      </Content>
    </Full>
  )
}
