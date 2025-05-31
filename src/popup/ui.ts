let isFetching = false;
let timeoutId: number | null = null;
let counter = 0;

export function initUiElements(getPageTextContent: () => void) {
  // Create a container for the popup content
  const container = document.createElement("div");
  container.id = "popup-container";
  container.className = "popup-container";

  // Create a title
  const title = document.createElement("h2");
  title.innerText = "Content Simplifier";
  title.style.textAlign = "center";

  // Append title to the container
  container.appendChild(title);

  // Append the container to the body
  document.body.appendChild(container);

  const btn = document.createElement("button");
  btn.innerText = "Get Page Content";
  btn.style.display = "block";
  btn.style.margin = "20px auto";
  btn.onclick = () => getPageTextContent();
  container.appendChild(btn);
}

export function markIsFetching(value: boolean) {
  if (value && isFetching) {
    console.warn("Already fetching content, ignoring this request.");
    return;
  }

  isFetching = value;

  if (value) {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loading-indicator";
    loadingIndicator.className = "loading-indicator";
    loadingIndicator.innerText = "Fetching content...";

    const timer = document.createElement("div");
    timer.id = "loading-timer";
    timer.className = "loading-timer";
    timer.innerText = "0s";
    loadingIndicator.appendChild(timer);

    if (timeoutId) {
      clearInterval(timeoutId);
      timeoutId = null;
    }
    counter = 0;
    // Start the timer
    timeoutId = setInterval(() => {
      counter++;
      const timer = document.getElementById("loading-timer");
      if (!timer) {
        console.error("Loading timer element not found.");
        clearInterval(timeoutId!);
        timeoutId = null;
        return;
      }
      timer.innerText = `${counter}s`;
    }, 1000);

    const container = document.getElementById("popup-container");
    if (container) {
      container.appendChild(loadingIndicator);
    }
  } else {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
}

export function isFetchingContent() {
  return isFetching;
}
