import { ModuleBase } from "./ModuleBase";

/**
 * TextSelectionSummary Module
 * This module captures text selections made by the user
 */
export class TextSelectionSummary extends ModuleBase {

    constructor() {
        super("TextSelectionSummary", "1.0.0");
    }

    init() {
        // Additional initialization logic for TextSelectionSummary
        console.log("TextSelectionSummary initialized");
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    destroy() {
        // Cleanup logic for TextSelectionSummary
        console.log("TextSelectionSummary destroyed");
        document.removeEventListener("mouseup", this.handleMouseUp.bind(this));
        super.destroy();
    }

    private handleMouseUp(event: MouseEvent) {
        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== "") {
            const selectedText = selection.toString();
            console.log("Selected text:", selectedText);
            // Here you can add logic to process the selected text, e.g., send it to a server or display it in a popup
        }
    }

}