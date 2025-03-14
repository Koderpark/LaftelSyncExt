import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export default function mainPopup() {
  const [data, setData] = useState("")
  
  return (
    <div>
      <h1>Hello</h1>
      <p>{data}</p>
    </div>
  )
}
