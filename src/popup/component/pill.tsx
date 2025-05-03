export function Pill(props) {
  return (
    <div className="flex items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-bold">
      {props.children}
    </div>
  )
}

export function PillBtn(props) {
  const { children, onClick, isActive } = props

  return (
    <div
      className={`flex items-center justify-center rounded-full ${
        isActive ? "bg-blue-500" : "bg-gray-900"
      } py-2 pe-4 ps-3 font-bold cursor-pointer shadow-md flex-row gap-1`}
      onClick={onClick}>
      {children}
    </div>
  )
}
