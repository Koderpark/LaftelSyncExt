import { Storage } from "@plasmohq/storage"
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
  await mainPage()
}

export async function loginPage() {
  await storage.set("page", "login")
}

export async function mainPage() {
  await storage.set("page", "main")
}

export async function roomPage() {
  await storage.set("page", "room")
}

export async function settingPage() {
  await storage.set("page", "setting")
}

export async function chatPage() {
  await storage.set("page", "chat")
}