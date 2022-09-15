(function () {
  // Create UI
  const ui = document.createElement("details");
  ui.open = true;
  ui.dataset.id = "aital";
  const summary = document.createElement("summary");
  const summaryText = document.createElement("span");
  summaryText.textContent = "Am I Talking A Lot?";
  summary.appendChild(summaryText);
  const iconsContainer = document.createElement("div");
  summary.appendChild(iconsContainer);
  iconsContainer.outerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
  `;
  ui.appendChild(summary);
  const content = document.createElement("div");
  ui.appendChild(content);

  document.body.appendChild(ui);

  const style = document.createElement("style");
  const selector = `details[data-id="aital"]`;
  style.textContent = `
  ${selector} {
    background: white;
    border: 1px solid hsla(0, 0%, 0%, 0.2);
    border-radius: 8px;
    left: 16px;
    position: fixed;
    top: 16px;
    width: 240px;
    z-index: 1;
  }

  ${selector} summary {
    display: flex;
    gap: 32px;
    justify-content: space-between;
    padding: 8px;
  }

  ${selector} summary svg {
    height: 16px;
    width: 16px;
  }

  ${selector}[open] summary svg:first-of-type {
    display: none;
  }

  ${selector}:not([open]) summary svg:last-of-type {
    display: none;
  }

  ${selector} > div {
    align-items: center;
    display: grid;
    font-size: smaller;
    gap: 8px;
    grid-template-columns: max-content 1fr max-content;
    padding: 0 8px;
  }

  ${selector} > div :nth-last-child(-n+3) {
    margin-bottom: 8px;
  }

  ${selector} progress {
    appearance: none;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
  }
  
  ${selector} progress::-webkit-progress-bar {
    background-color: hsl(0, 0%, 90%);
  }
  
  ${selector} progress[data-level="0"]::-webkit-progress-value {
    background-color: #00ac48;
  }
  
  ${selector} progress[data-level="1"]::-webkit-progress-value {
    background-color: #ffbb00;
  }
  
  ${selector} progress[data-level="2"]::-webkit-progress-value {
    background-color: #e94337;
  }
  
  ${selector} progress[data-level="3"]::-webkit-progress-value {
    background-color: #971a11;
  }

  ${selector} progress[data-level="2"] {
    animation: aital-little-shake 0.4s linear infinite;
  }
  
  ${selector} progress[data-level="3"] {
    animation: aital-big-shake 0.3s linear infinite;
  }
  
  @keyframes aital-little-shake {
    0% {
      transform: translate(0);
    }
  
    10% {
      transform: translate(-1px, -1px);
    }
  
    20% {
      transform: translate(1px, -1px);
    }
  
    30% {
      transform: translate(-1px, 1px);
    }
  
    40% {
      transform: translate(1px, 1px);
    }
  
    50% {
      transform: translate(-1px, -1px);
    }
  
    60% {
      transform: translate(1px, -1px);
    }
  
    70% {
      transform: translate(-1px, 1px);
    }
  
    80% {
      transform: translate(-1px, -1px);
    }
  
    90% {
      transform: translate(1px, -1px);
    }
  
    100% {
      transform: translate(0);
    }
  }
  
  @keyframes aital-big-shake {
    0% {
      transform: translate(0);
    }
  
    10% {
      transform: translate(-2px, -2px);
    }
  
    20% {
      transform: translate(2px, -2px);
    }
  
    30% {
      transform: translate(-2px, 2px);
    }
  
    40% {
      transform: translate(2px, 2px);
    }
  
    50% {
      transform: translate(-2px, -2px);
    }
  
    60% {
      transform: translate(2px, -2px);
    }
  
    70% {
      transform: translate(-2px, 2px);
    }
  
    80% {
      transform: translate(-2px, -2px);
    }
  
    90% {
      transform: translate(2px, -2px);
    }
  
    100% {
      transform: translate(0);
    }
  }
`;
  document.head.appendChild(style);

  // IisKdb gjg47c u5mc1b BbJhmb YE1TS YFyDbd
  let quietClassString = null;

  const tally = {
    __seconds: 0,
  };

  const elementsByName = {};

  function alphaStringifyClassList(classList) {
    return [...classList].sort().join(" ");
  }

  function truncate(name) {
    const parts = name.split(" ");
    if (parts.length === 1) return name;

    return parts
      .map((part, i) => {
        if (i === 0) return part;
        return part[0] + ".";
      })
      .join(" ");
  }

  function valueToLevel(string) {
    const value = parseFloat(string);
    if (value <= 50) {
      return 0;
    } else if (value <= 75) {
      return 1;
    } else if (value <= 90) {
      return 2;
    } else if (value <= 100) {
      return 3;
    }
  }

  function tick() {
    if (!quietClassString) {
      const muteButton = document.querySelector(
        "button[aria-label*=microphone][data-is-muted]"
      );

      if (!muteButton) return;

      let clicked = false;

      if (muteButton.dataset.isMuted == "false") {
        muteButton.click();
        clicked = true;
      }

      try {
        const indicator =
          document.querySelector("[data-use-tooltip]").lastChild;

        quietClassString = alphaStringifyClassList(indicator.classList);

        if (clicked) {
          muteButton.click();
        }
      } catch (e) {
        return console.debug(e);
      }
    }

    const participants = document.querySelectorAll("[data-self-name]");
    const thumbnails = document.querySelectorAll("[data-second-screen=false]");

    if (thumbnails.length > 0) {
      tally.__seconds++;
    }

    const indicators = [];
    document.querySelectorAll("i.google-material-icons").forEach((node) => {
      if (node.textContent === "devices") {
        const previous = node.previousSibling;
        if (previous.dataset.useTooltip) {
          indicators.push(previous.lastChild);
        } else {
          indicators.push(previous);
        }
      }
    });

    indicators.forEach((node, i) => {
      const name = participants[i].textContent;
      if (!tally[name]) {
        tally[name] = 0;
      }
      if (alphaStringifyClassList(node.classList) !== quietClassString) {
        tally[name]++;
      }
    });

    const { __seconds, ...record } = tally;
    Object.entries(record).forEach(([name, tally]) => {
      const value = ((tally * 100) / __seconds).toFixed(2);

      if (elementsByName[name]) {
        const { progress, percent } = elementsByName[name];
        progress.value = value;
        progress.dataset.level = valueToLevel(value);

        percent.textContent = value + "%";
      } else {
        const label = document.createElement("label");
        label.textContent = truncate(name);

        const progress = document.createElement("progress");
        progress.max = 100;
        progress.min = 0;
        progress.value = value;
        progress.dataset.level = valueToLevel(value);

        const percent = document.createElement("span");
        percent.textContent = value + "%";

        content.appendChild(label);
        content.appendChild(progress);
        content.appendChild(percent);

        elementsByName[name] = {
          label,
          percent,
          progress,
        };
      }
    });
  }

  setInterval(tick, 1000);
})();
