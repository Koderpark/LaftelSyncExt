const ColorMap = {
  submit: "bg-blue-500",
  option: "bg-gray-800"
}

export function Btn(props) {
  const { label, onClick, submit = true, type = "submit" } = props
  return (
    <button
      className={`text-white min-w-20 w-full p-2 rounded-lg block shadow-md ${ColorMap[type]}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}>
      {label}
    </button>
  )
}