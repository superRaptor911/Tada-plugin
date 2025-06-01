export function getSelectionRect() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null; // No selection or no ranges
    }
    
    if (selection.rangeCount === 0) {
      return null; // No selection
    }
    
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // rect contains: top, left, right, bottom, width, height
    return rect;
  }