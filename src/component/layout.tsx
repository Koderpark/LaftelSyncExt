export function Header(props){
  return (
    <div className="w-full h-12 bg-gray-200 flex items-center px-4">
      {props.children}
    </div>
  )
}

export function Content(props){
  return (
    <div className="w-full grow p-4">
      {props.children}
    </div>
  )
}