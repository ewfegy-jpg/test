(function () {
  function moveButton() {
    const btn = document.getElementById("zen-workspaces-button");
    const container = document.querySelector(".zen-current-workspace-indicator");

    if (!btn || !container) return;

    // prevent duplicate move
    if (container.querySelector("#zen-workspaces-button")) return;

    // create wrapper for layout control
    const wrapper = document.createXULElement("hbox");
    wrapper.className = "zen-workspaces-button-wrapper";
    wrapper.setAttribute("align", "center");

    wrapper.appendChild(btn);
    container.appendChild(wrapper);

    console.log("Workspace button moved");
  }

  // wait for UI
  const observer = new MutationObserver(moveButton);
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(moveButton, 100);
})();
