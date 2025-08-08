import { useStorage } from "@plasmohq/storage/hook"
import type { Log } from "~background/const"

function LogElement(props: Log) {
  const { type, message } = props
  const match = {
    success: "bg-green-400",
    error: "bg-red-400"
  }

  return (
    <div className={`w-full rounded-xl shadow-lg ${match[type]} px-3 py-1`}>
      <p className="text-base font-bold">{message}</p>
    </div>
  )
}

export function LogRenderer() {
  const [log] = useStorage<Log[]>("log")

  return (
    <div className="fixed top-0 right-0 flex flex-col gap-2 items-center justify-center p-3">
      {log && log.map((v: Log, i: number) => <LogElement key={i} {...v} />)}
    </div>
  )
}