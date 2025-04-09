export function Header(props){
  return (
    <div className="w-full h-12 bg-gray-200 flex items-center px-4">
      {props.children}
    </div>
  )
}

export function Content(props) {
  return (
    <div className="w-full grow bg-gray-50 p-4 flex flex-col">
      {props.children}
    </div>
  )
}

export function Nav(props) {
  return (
    <div className="w-full h-12 bg-gray-200 flex items-center px-4 self-end">
      {props.children}
    </div>
  )
}

export function Layout({ children }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="grow">{children}</div>
      <div className="w-full h-12 bg-gray-200 flex items-center px-4">
        <p>Footer</p>
      </div>
    </div>
  )
}

export function Full({ children }) {
  return <div className="w-full h-full flex flex-col">{children}</div>
}