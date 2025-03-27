import { useState } from "react"

import { Content, Header } from "../component"

export default function loginPopup(props) {
  const { Login } = props
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")

  return (
    <div className="w-full h-full flex flex-col p-0">
      <Header>
        <h1>LaftelSync</h1>
      </Header>
      <Content>
        <form className="w-full flex flex-col gap-4">
          <input
            className="w-full h-12 p-4"
            type="text"
            placeholder="Username"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="w-full h-12 p-4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPw(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              Login(id, pw)
            }}>
            Login
          </button>
        </form>
      </Content>
    </div>
  )
}
