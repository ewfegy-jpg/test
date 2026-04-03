(function () {
  function initWorkspaceButtons() {
    const originalBtn = document.getElementById("zen-workspaces-button");
    if (!originalBtn) return;

    const workspaces = document.querySelectorAll("zen-workspace");
    if (!workspaces.length) return;

    const firstWorkspace = workspaces[0];

    workspaces.forEach((ws) => {
      const container = ws.querySelector(".zen-current-workspace-indicator");
      if (!container) return;

      let wrapper = container.querySelector(".zen-workspaces-button-wrapper");

      // create wrapper if missing
      if (!wrapper) {
        wrapper = document.createXULElement("hbox");
        wrapper.className = "zen-workspaces-button-wrapper";
        wrapper.setAttribute("align", "center");
        container.appendChild(wrapper);
      }

      // FIRST workspace → move ORIGINAL button
      if (ws === firstWorkspace) {
        if (!wrapper.contains(originalBtn)) {
          wrapper.appendChild(originalBtn);
        }
      } 
      // OTHER workspaces → clone
      else {
        if (wrapper.querySelector(".zen-workspaces-button-clone")) return;

        const clone = originalBtn.cloneNode(true);
        clone.removeAttribute("id");
        clone.classList.add("zen-workspaces-button-clone");

        wrapper.appendChild(clone);
      }
    });

    console.log("Workspace buttons initialized (original + clones)");
  }

  function syncClonesFromOriginal() {
    const originalContainer = document.getElementById("zen-workspaces-button");
    if (!originalContainer) return;

    // find active button in original
    const activeBtn = originalContainer.querySelector('toolbarbutton[active="true"]');
    if (!activeBtn) return;

    const activeWorkspaceId = activeBtn.getAttribute("zen-workspace-id");
    if (!activeWorkspaceId) return;

    // update all cloned buttons
    const allClones = document.querySelectorAll(".zen-workspaces-button-clone");
    allClones.forEach((clone) => {
      const cloneButtons = clone.querySelectorAll("toolbarbutton");
      cloneButtons.forEach((btn) => {
        if (btn.getAttribute("zen-workspace-id") === activeWorkspaceId) {
          btn.setAttribute("active", "true");
        } else {
          btn.removeAttribute("active");
        }
      });
    });
  }

  function attachClickSync() {
    const allButtons = document.querySelectorAll("#zen-workspaces-button toolbarbutton, .zen-workspaces-button-clone toolbarbutton");

    allButtons.forEach((btn) => {
      if (btn._syncListenerAttached) return;
      btn._syncListenerAttached = true;

      btn.addEventListener("click", () => {
        // wait a tick for Zen to update original active button, then sync clones
        setTimeout(syncClonesFromOriginal, 50);
      });
    });
  }

  // Observe DOM changes to re-init buttons and attach listeners
  const observer = new MutationObserver(() => {
    initWorkspaceButtons();
    attachClickSync();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial setup
  setTimeout(() => {
    initWorkspaceButtons();
    attachClickSync();
    syncClonesFromOriginal();
  }, 200);
})();(function () {
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
