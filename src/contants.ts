export const EVENTS = {
    EVENT_CAPTURE_PAGE_SUMMARY: "CAPTURE_PAGE_SUMMARY",
    EVENT_FULL_PAGE_HTML_CONTENT : "FULL_PAGE_HTML_CONTENT",
    EVENT_FULL_PAGE_TEXT : "FULL_PAGE_TEXT",

    EVENT_TEXT_SELECTION_REQUEST: "TEXT_SELECTION_REQUEST",
    EVENT_TEXT_SELECTION_RESPONSE: "TEXT_SELECTION_RESPONSE",
} as const;

export type EventName = typeof EVENTS[keyof typeof EVENTS]; 

export type EventPayloadMap = {
    CAPTURE_PAGE_SUMMARY: string;
    FULL_PAGE_HTML_CONTENT: string;
    FULL_PAGE_TEXT: string;
    TEXT_SELECTION_REQUEST: { selectionId: string, text: string };
    TEXT_SELECTION_RESPONSE: { selectionId: string; summary: string };
};

export type EventObject = {
    [K in EventName]: { type: K; payload: EventPayloadMap[K] }
}[EventName];