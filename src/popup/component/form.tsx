import { useState } from "react"

export function StringField(props) {
  const { label, value, setValue } = props
  return (
    <input
      className="block w-full bg-gray-800 text-white p-2 rounded-md"
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
      className="block w-full bg-gray-800 text-white p-2 rounded-md"
      type="password"
      value={value}
      placeholder={label}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export function SubmitBtn(props) {
  const { label, onClick } = props
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md block w-full"
      onClick={onClick}>
      {label}
    </button>
  )
}
