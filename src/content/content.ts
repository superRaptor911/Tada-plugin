import { ModuleBase } from "../modules/ModuleBase";
import { PageSummary } from "../modules/PageSummary";
import { TextSelectionSummary } from "../modules/TextSelectionSummary";

const MODULES : ModuleBase[] = [
  new PageSummary(),
  new TextSelectionSummary(),
]
// Initialize all modules
for (const module of MODULES) {
  module.init();
  console.log(`Module initialized: ${module.getName()} v${module.getVersion()}`);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  for (const module of MODULES) {
    if (module.handleMessageEvent(message)) {
      return true; // Stop processing further modules if one has handled the message
    }
  }
});
