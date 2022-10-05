// @ts-check

(function () {
  // Create UI
  const details = document.createElement("details");
  details.open = true;
  details.dataset.id = "aital";
  const summary = document.createElement("summary");
  summary.innerHTML = `
    <span>Am I Talking A Lot?</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="208 96 128 176 48 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="48 160 128 80 208 160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
  `;
  details.appendChild(summary);
  const content = document.createElement("div");
  details.appendChild(content);

  document.body.appendChild(details);

  let quietClassString = null;

  const tally = {
    __seconds: 0,
  };

  const elementsByName = {};
  let indicators;
  let participants;

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

  function valueToLevel(value) {
    if (value >= 90) {
      return 3;
    } else if (value >= 75) {
      return 2;
    } else if (value >= 50) {
      return 1;
    } else {
      return 0;
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
        return console.log(e);
      }
    }

    participants = document.querySelectorAll("[data-self-name]");

    if (participants.length <= 1) {
      return;
    }

    tally.__seconds++;

    indicators = [];
    document.querySelectorAll("i.google-material-icons").forEach((node) => {
      if (node.textContent === "devices") {
        const previous = node.previousSibling;

        if (!previous) {
          // There should always be a previous sibling, but better safe than
          // sorry.
          console.error("No previous sibling for node", node);
          return;
        }

        if (previous.dataset.useTooltip) {
          indicators.push(previous.lastChild);
        } else {
          indicators.push(previous);
        }
      }
    });

    indicators.forEach((node, i) => {
      const participant = participants[i];
      if (!participant) {
        console.error("No matching participant for indicator", {
          index: i,
          indicators,
          node,
          participants,
        });
        return;
      }
      const name = participant.textContent;
      if (!tally[name]) {
        tally[name] = 0;
      }
      if (alphaStringifyClassList(node.classList) !== quietClassString) {
        tally[name]++;
      }
    });

    const { __seconds, ...record } = tally;
    Object.entries(record).forEach(([name, count]) => {
      const value = (count * 100) / __seconds;
      const readableValue = value.toFixed(2);

      if (elementsByName[name]) {
        // We have DOM references for this participant, so just update values
        const { progress, percent } = elementsByName[name];
        progress.value = value;
        progress.dataset.level = valueToLevel(value);
        percent.textContent = readableValue;
      } else {
        // No DOM references, create UI elements and store them
        const label = document.createElement("label");
        label.textContent = truncate(name);
        label.title = name;

        const progress = document.createElement("progress");
        progress.max = 100;
        progress.value = value;
        progress.dataset.level = valueToLevel(value).toString();

        const percent = document.createElement("span");
        percent.textContent = readableValue;

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

  // Add a click handler for debugging purposes
  content.addEventListener("click", (e) => {
    if (e.shiftKey) {
      console.log("Debugging output AITAL extension", {
        data: tally,
        elements: elementsByName,
        participants,
        indicators,
      });
    }
  });

  setInterval(tick, 1000);
})();
