import { useStorage } from "@plasmohq/storage/hook"

const HeaderMap = {
  login: "LaftelSync 로그인",
  main: "같이 시청하기",
  setting: "설정",
  chat: "채팅"
}

export default function Header(props) {
  const { children } = props
  const [page] = useStorage("page")
  return (
    <div className="w-full h-16 flex items-center justify-between bg-gray-800 text-white px-4 shadow-md">
      <h1 className="text-2xl font-bold">{HeaderMap[page]}</h1>
      {children}
    </div>
  )
}
