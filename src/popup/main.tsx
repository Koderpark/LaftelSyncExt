import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export default function mainPopup(props) {
  const { Logout } = props
  const [data, setData] = useState("")

  return (
    <div>
      <h1>Hello</h1>
      <p>{data}</p>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}