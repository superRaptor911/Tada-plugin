import { EVENTS } from "../contants";
import { PluginMessageEvent } from "../types";
import { ModuleBase } from "./ModuleBase";
import React from "react";
import ReactDOM from "react-dom/client";

export class PageSummary extends ModuleBase {
    constructor() {
        super("PageSummary", "1.0.0");
    }

    init() {

    }

    destroy() {
        super.destroy();
    }

    handleMessageEvent(event: PluginMessageEvent): boolean {
        if (event.type === EVENTS.EVENT_CAPTURE_PAGE_SUMMARY) {
            const text = document.body.innerText || "";
            this.sendMessageEvent("POPUP", {
                type: EVENTS.EVENT_FULL_PAGE_TEXT,
                payload: text
            });
            return true;
        } else if (event.type === EVENTS.EVENT_FULL_PAGE_HTML_CONTENT) {
            const htmlContent = event.payload || "";
            this.renderHTMLContent(htmlContent);
            return true;
        }

        return super.handleMessageEvent(event); // Call the base class method for unhandled events
    }

    private renderHTMLContent(htmlContent: string) {
        const container = document.createElement("div");
        container.className = "root";
        container.innerHTML = htmlContent;

        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.onclick = () => {
            container.remove();
            console.log("Content removed from the page.");
        };
        closeButton.classList.add("close-button");
        container.appendChild(closeButton);

        document.body.appendChild(container);
        console.log("HTML content injected into the page.", "HTML content:", htmlContent);
    }
}
