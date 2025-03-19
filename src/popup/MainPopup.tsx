import { useContext, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { Content, Header, Noti, NotiContext, Pill } from "~component"

function NotiElem() {
  return (
    <div className="w-full h-full flex flex-col p-0">
      <h1>hello</h1>
    </div>
  )
}

export default function mainPopup(props) {
  const { Logout } = props
  const [data, setData] = useState("")

  const { openNoti } = useContext(NotiContext)

  return (
    <div className="w-full h-full flex flex-col p-0">
      <Header>
        <div className="grow">
          <h1>Hello</h1>
        </div>
        <Pill>
          <button onClick={Logout}>Logout</button>
        </Pill>
      </Header>
      <Content>
        <p>{data}</p>
        <button onClick={() => openNoti(NotiElem, "success")}>Open Noti</button>
      </Content>
    </div>
  )
}
