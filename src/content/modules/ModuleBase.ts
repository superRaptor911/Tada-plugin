import { PluginMessageEvent } from "../../types";

export class ModuleBase {
    private _name: string;
    private _version: string;
    constructor(name : string, version: string) {
        this._name = name;
        this._version = version;
    }
    
    getName() {
        return this._name;
    }
    
    getVersion() {
        return this._version;
    }

    /**
     * This method is called when the module is initialized.
     * It should contain logic to set up event listeners, initialize variables, etc.
     */
    init() {
        // Initialization logic for the module
        console.log("Module initialized");
    }

    /**
     * This method is called when the module is destroyed.
     * It should contain cleanup logic to remove event listeners, clear intervals, etc.
     */
    destroy() {
        // Cleanup logic for the module
        console.log("Module destroyed");
    }

    handleMessageEvent(event: PluginMessageEvent) : boolean{
        return false; // Return true if the event was handled, false otherwise
    }

    sendMessageEvent(to: "POPUP" | "CONTENT" | "BACKGROUND", event: PluginMessageEvent) {
        if (to === "POPUP") {
            chrome.runtime.sendMessage(event);
        } else if (to === "CONTENT") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, event);
                }
            });
            // have to check this
        } else if (to === "BACKGROUND") {
            chrome.runtime.sendMessage(event);
        }
    }
}