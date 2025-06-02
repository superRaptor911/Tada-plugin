import Showdown from "showdown";
import { EventObject, EVENTS } from "./contants";

let isFetching = false;
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

chrome.runtime.onMessage.addListener(async (message : EventObject, sender, sendResponse) => {
  if (message.type === EVENTS.EVENT_FULL_PAGE_TEXT) {
    if (isFetching) {
      console.warn("Already fetching content, ignoring this request.");
      return;
    }
    markIsFetching(true);
    console.log("Text content from tab:", message.payload);

    const data = await fetch("http://localhost:8000/simplify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message.payload,
      }),
    });

    const markdownData = await data.json();
    console.log("Markdown content:", markdownData);
    const converter = new Showdown.Converter();
    const htmlContent = converter.makeHtml(markdownData.content);
    console.log("HTML content:", htmlContent);

    markIsFetching(false);

    // send message back to content script
    if (sender.tab && sender.tab.id) {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: EVENTS.EVENT_FULL_PAGE_HTML_CONTENT,
        payload: htmlContent,
      });
    }
  }
});

function markIsFetching(value: boolean) {
  isFetching = value;
}
