export default function Pill(props){
    return (
        <div className="flex items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-bold">
            {props.children}
        </div>
    )
}
