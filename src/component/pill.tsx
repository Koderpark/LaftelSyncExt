export default function Pill(props){
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
        className="flex items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-bold cursor-pointer"
        onClick={onClick}>
        {children}
      </div>
    )
  } else {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gray-400 py-2 px-4 font-bold cursor-pointer"
        onClick={onClick}>
        {children}
      </div>
    )
  }
}
