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
