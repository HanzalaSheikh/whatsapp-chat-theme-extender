// Apply selected theme
document.querySelectorAll("button[data-theme]").forEach(button => {
  button.addEventListener("click", async () => {
    const theme = button.getAttribute("data-theme");

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url.includes("web.whatsapp.com")) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [theme]
      });
    }
  });
});

// Reset to default (remove all custom CSS)
document.getElementById("resetBtn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url.includes("web.whatsapp.com")) {
    // remove all previously injected styles
    await chrome.scripting.removeCSS({
      target: { tabId: tab.id },
      files: ["styles/theme1.css", "styles/theme2.css", "styles/theme3.css"]
    });
  }
});


