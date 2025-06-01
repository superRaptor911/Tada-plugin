import { EVENTS } from "../../contants";
import { ModuleBase } from "../ModuleBase";
import { getSelectionRect } from "./helpers";

/**
 * TextSelectionSummary Module
 * This module captures text selections made by the user
 */
export class TextSelectionSummary extends ModuleBase {
    private selectionPopup: HTMLDivElement | null = null;
    private selectionPopupImage: HTMLImageElement | null = null;

    constructor() {
        super("TextSelectionSummary", "1.0.0");
    }

    init() {
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
        document.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.selectionPopup = document.createElement("div");
        this.selectionPopup.id = "text-selection-popup";
        this.selectionPopup.style.display = "none";

        const image = document.createElement("img");
        image.src = chrome.runtime.getURL("assets/images/tada.png");
        image.alt = "Tada!";
        this.selectionPopupImage = image;
        this.selectionPopup.appendChild(image);
        document.body.appendChild(this.selectionPopup);
    }

    destroy() {
        // Cleanup logic for TextSelectionSummary
        console.log("TextSelectionSummary destroyed");
        document.removeEventListener("mouseup", this.handleMouseUp.bind(this));
        document.removeEventListener("mousedown", this.handleMouseDown.bind(this));
        super.destroy();
    }

    private handleMouseUp(event: MouseEvent) {
        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== "") {
            const selectedText = selection.toString();
            console.log("Selected text:", selectedText);
            const rect = getSelectionRect();
            if (rect) {
                console.log("Selection rectangle:", rect);
                this.showSelectionPopup(rect);
            }
            // this.sendMessageEvent("POPUP", {
            //     type: EVENTS.EVENT_FULL_PAGE_TEXT,
            //     payload: selectedText
            // });


            // Here you can add logic to process the selected text, e.g., send it to a server or display it in a popup
        }
    }

    private handleMouseDown(event: MouseEvent) {
        this.hideSelectionPopup();
    }

    private showSelectionPopup(rect: DOMRect) {
        if (this.selectionPopup) {
            this.selectionPopup.style.display = "block";
            this.selectionPopup.style.top = `${rect.bottom + window.scrollY}px`;
            this.selectionPopup.style.left = `${rect.left + window.scrollX}px`;
        }
    }

    private hideSelectionPopup() {
        if (this.selectionPopup) {
            this.selectionPopup.style.display = "none";
        }
    }

}