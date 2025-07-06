import { EVENTS } from "../../contants";
import { ModuleBase } from "../ModuleBase";
import { getSelectionRect } from "./helpers";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * TextSelectionSummary Module
 * This module captures text selections made by the user
 */
export class TextSelectionSummary extends ModuleBase {
  private selectionPopup: HTMLDivElement | null = null;
  private selectionPopupImage: HTMLImageElement | null = null;
  private mousePosition: MousePosition = { x: 0, y: 0 };

  private isLoadingSummary: boolean = false;

  constructor() {
    super("TextSelectionSummary", "1.0.0");
  }

  init() {


    document.addEventListener(
      "selectionchange",
      this.handleSelectionChange.bind(this)
    );
    document.addEventListener("mousemove", this.trackMousePosition.bind(this));
    this.selectionPopup = document.createElement("div");
    this.selectionPopup.id = "text-selection-popup";
    this.selectionPopup.style.display = "none";

    const image = document.createElement("img");
    image.src = chrome.runtime.getURL("assets/images/tada.png");
    image.alt = "Tada!";
    image.addEventListener("click", this.onPopupClick.bind(this));
    this.selectionPopupImage = image;
    this.selectionPopup.appendChild(image);
    document.body.appendChild(this.selectionPopup);
  }

  destroy() {
    // Cleanup logic for TextSelectionSummary
    console.log("TextSelectionSummary destroyed");
    document.removeEventListener(
      "selectionchange",
      this.handleSelectionChange.bind(this)
    );
    document.removeEventListener(
      "mousemove",
      this.trackMousePosition.bind(this)
    );
    this.selectionPopupImage?.removeEventListener(
      "click",
      this.onPopupClick.bind(this)
    );
    super.destroy();
  }

  private handleSelectionChange(event: Event) {
    console.log("Selection changed", event);
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 100) {
      // console.log("Selected text:", selectedText);
      const rect = getSelectionRect();
      if (rect) {
        this.showSelectionPopup(rect);
      } else {
        this.hideSelectionPopup();
        console.warn("No selection rectangle found.");
      }
    } else {
      this.hideSelectionPopup();
    }
  }

  private onPopupClick(event: MouseEvent) {
    // Prevent the click event from propagating to the document
    event.stopPropagation();
    event.preventDefault();
    try {
      if (this.isLoadingSummary) {
        console.warn("Already loading summary, ignoring this request.");
        return;
      }
      this.isLoadingSummary = true;
      const selection = window.getSelection();
      const selectedText = selection?.toString() ?? "";

      if (selectedText) {
        this.sendMessageEvent("POPUP", {
          type: EVENTS.EVENT_FULL_PAGE_TEXT,
          payload: selectedText,
        });
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      this.isLoadingSummary = false;
    }
  }

  private showSelectionPopup(rect: DOMRect) {
    if (this.selectionPopup) {
      this.selectionPopup.style.display = "block";
      this.selectionPopup.style.top = `${
        this.mousePosition.y + window.scrollY + 20
      }px`;
      this.selectionPopup.style.left = `${
        this.mousePosition.x + window.scrollX + 20
      }px`;
    }
  }

  private hideSelectionPopup() {
    if (this.selectionPopup) {
      this.selectionPopup.style.display = "none";
    }
  }

  private trackMousePosition(event: MouseEvent) {
    this.mousePosition.x = event.clientX;
    this.mousePosition.y = event.clientY;
  }
}
