export function Pill(props) {
  return (
    <div className="flex items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-bold">
      {props.children}
    </div>
  )
}

export function PillBtn(props) {
  const { children, onClick, isActive } = props

  if (isActive) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-blue-500 py-2 px-4 font-bold cursor-pointer shadow-md"
        onClick={onClick}>
        {children}
      </div>
    )
  } else {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gray-900 py-2 px-4 font-bold cursor-pointer shadow-md"
        onClick={onClick}>
        {children}
      </div>
    )
  }
}
