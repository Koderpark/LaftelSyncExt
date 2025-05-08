const ColorMap = {
  submit: "bg-blue-500",
  option: "bg-gray-800"
}

export function Btn(props) {
  const { label, onClick, submit = true, type = "submit" } = props
  return (
    <button
      className={`text-white p-2 rounded-md block w-full shadow-md ${ColorMap[type]}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}>
      {label}
    </button>
  )
}
