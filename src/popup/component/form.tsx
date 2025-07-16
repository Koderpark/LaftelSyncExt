import { useStorage } from "@plasmohq/storage/hook"

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

export function StorageField(props) {
  const { storageKey, label } = props
  console.log(storageKey)
  const [storage, setStorage] = useStorage(storageKey)

  return (
    <input
      className="block w-full bg-gray-800 text-white p-2 rounded-md shadow-md"
      type="text"
      value={storage || ""}
      placeholder={label}
      onChange={(e) => setStorage(e.target.value)}
    />
  )
}
