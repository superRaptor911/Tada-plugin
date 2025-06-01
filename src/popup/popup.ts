import Showdown from "showdown";
import "./popup.css";
import { initUiElements, markIsFetching } from "./ui";
import {
  EVENTS
} from "../contants";

let isFetching = false;

// Function to get the active tab
function getActiveTab(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) resolve(tabs[0]);
      else reject("No active tab.");
    });
  });
}

async function msg_getPageTextContent() {
  const tab = await getActiveTab();

  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: EVENTS.EVENT_CAPTURE_PAGE_SUMMARY,
      payload: {},
    });
  }
}

// // Listen for message from content script
// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   if (message.type === EVENTS.EVENT_FULL_PAGE_TEXT) {
//     if (isFetching) {
//       console.warn("Already fetching content, ignoring this request.");
//       return;
//     }
//     markIsFetching(true);
//     console.log("Text content from tab:", message.payload);

//     const data = await fetch("http://localhost:8000/simplify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         content: message.payload,
//       }),
//     });

//     const markdownData = await data.json();
//     console.log("Markdown content:", markdownData);
//     const converter = new Showdown.Converter();
//     const htmlContent = converter.makeHtml(markdownData.content);
//     console.log("HTML content:", htmlContent);

//     markIsFetching(false);

//     // send message back to content script
//     if (sender.tab && sender.tab.id) {
//       chrome.tabs.sendMessage(sender.tab.id, {
//         type: EVENTS.EVENT_FULL_PAGE_HTML_CONTENT,
//         payload: htmlContent,
//       });
//     }
//   }
// });

// Trigger on popup lo
document.addEventListener("DOMContentLoaded", () => {
  initUiElements(msg_getPageTextContent);
});
