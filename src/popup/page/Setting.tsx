import { useContext, useEffect, useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { Content, Full } from "~popup/component/layout"
import { Btn } from "~popup/component/button"
import packageJson from "../../../package.json"
import { message } from "~popup/message"
import { StorageField } from "~popup/component/form"

export default function SettingPopup(props) {
  const [count, setCount] = useState(0)

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await message("auth/logout")
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
    const res = await message("log/success", { text: `hello world ${count}` })
    setCount(count + 1)
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
          <StorageField storageKey="username" label="사용자 이름" />
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
