import { useContext, useEffect } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "~popup/component/pill"
import { NotiContext } from "~popup/component/noti"
import { Content, Full } from "~popup/component/layout"
import { Btn } from "~popup/component/button"
import packageJson from "../../../package.json"

export default function SettingPopup(props) {
  const { openNoti, message } = useContext(NotiContext)

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await message("auth/logout")
    if (res) openNoti("로그아웃 성공", "success")
  }

  const handleInfoPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    message("page/newTab", {
      url: "https://blog.koder.page/laftelsync"
    })
  }

  const handleReportPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    message("page/newTab", {
      url: "https://github.com/koderpark/laftelSyncExt/issues"
    })
  }

  const handleAuthPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    message("page/newTab", { url: "#" }) // TODO: 계정 설정 페이지 추가
  }

  const logTest = async () => {
    const res = await message("log/test", { msg: "hello world" })
    console.log(res)
  }

  return (
    <Full>
      <Content>
        <Full>
          <div className="flex self-center h-32 w-32 bg-gray-200 mb-4">
            TODO: logo
          </div>
          <div className="flex self-center">
            <p className="text-gray-400 text-md">
              LaftelSyncExt v{packageJson.version}
            </p>
          </div>
        </Full>
        <div className="flex flex-col gap-2">
          <Btn label="계정 설정" onClick={handleAuthPage} type="option" />
          <Btn label="로그아웃" onClick={handleLogout} type="option" />
          <div className="flex gap-2">
            <Btn label="도움말" onClick={handleInfoPage} type="option" />
            <Btn
              label="오류제보/건의"
              onClick={handleReportPage}
              type="option"
            />
          </div>
          <Btn label="Log Test" onClick={logTest} />
        </div>
      </Content>
    </Full>
  )
}
