export function Label(props) {
  const { children } = props
  return (
    <div className="px-1 py-0 bg-gray-100 rounded-md border border-gray-200">
      <p className="text-sm text-gray-700">{children}</p>
    </div>
  )
}
