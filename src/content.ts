(() => {
  console.log("Content script loaded");
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "RUN") {
    const text = document.body.innerText || "";
    chrome.runtime.sendMessage({ type: "PAGE_TEXT", payload: text });
  } else if (message.type === "HTML_CONTENT") {
    const htmlContent = message.payload || "";
    const container = document.createElement("div");
    container.className = "root";
    container.innerHTML = htmlContent;

    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.onclick = () => {
      container.remove();
      console.log("Content removed from the page.");
    };
    container.appendChild(closeButton);
   closeButton.classList.add("close-button");
    document.body.appendChild(container);
    console.log("HTML content injected into the page.", "HTML content:", htmlContent);
  }
});
