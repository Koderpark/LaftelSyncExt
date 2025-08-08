import { Storage } from "@plasmohq/storage"
import type { Page } from "~background/type"
const storage = new Storage()

export async function newTab(url: string) {
  await chrome.tabs.create({ url })
}

export async function modifyTab(url: string) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })
  await chrome.tabs.update(tab.id, { url })
}

/****** 페이지 이동 관련 함수 *******/

export async function initPage() {
  await newTab("http://localhost:3000/")
}