export function StringField(props) {
  const { label, value, setValue } = props
  return (
    <input
      className="block w-full bg-gray-800 text-white p-2 rounded-md shadow-md"
      type="text"
      value={value}
      placeholder={label}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export function PasswordField(props) {
  const { label, value, setValue } = props
  return (
    <input
      className="block w-full bg-gray-800 text-white p-2 rounded-md shadow-md"
      type="password"
      value={value}
      placeholder={label}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
