import { EventName, EventObject, EventPayloadMap } from "../contants";
import { PluginMessageEvent } from "../types";

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

    handleMessageEvent(event: EventObject) : boolean{
        return false; // Return true if the event was handled, false otherwise
    }

    sendMessageEvent<T extends EventName>(event: T, payload: EventPayloadMap[T]) {
        const data: PluginMessageEvent = {
            type: event,
            payload: payload
        };
        
        chrome.runtime.sendMessage(event);
    }
}