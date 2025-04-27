export function Content(props) {
  return (
    <div className="w-full grow bg-gray-700 text-white p-4 flex flex-col">
      {props.children}
    </div>
  )
}

export function Full({ children }) {
  return <div className="w-full h-full flex flex-col">{children}</div>
}
