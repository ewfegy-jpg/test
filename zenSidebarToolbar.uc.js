; // prevent "not a function" errors
console.log("ZEN SCRIPT LOADED");

(function () {
  const SOURCE_ID = "zen-sidebar-foot-buttons";        // your existing bottom toolbar
  const NEW_ID = "zen-sidebar-custom-toolbar";        // cloned bottom toolbar
  const PANEL_ID = "zen-sidebar-extra-panel";         // new sidebar panel

  let toolbarReady = false;
  let panelReady = false;

  // -------------------- BOTTOM TOOLBAR --------------------
  function initToolbar() {
    if (toolbarReady) return true;
    if (!window.CustomizableUI) return false;

    if (!CustomizableUI.getAreaType(NEW_ID)) {
      CustomizableUI.registerArea(NEW_ID, {
        type: CustomizableUI.TYPE_TOOLBAR,
        defaultPlacements: []
      });
    }

    const original = document.getElementById(SOURCE_ID);
    if (!original) return false;

    if (document.getElementById(NEW_ID)) {
      toolbarReady = true;
      return true;
    }

    try {
      const clone = original.cloneNode(true);
      clone.id = NEW_ID;
      clone.setAttribute("toolbarname", "Custom Sidebar Toolbar");

      clone.removeAttribute("currentset");
      clone.removeAttribute("defaultset");

      const workspaceButton = clone.querySelector("#zen-workspaces-button");
      if (workspaceButton) workspaceButton.remove();

      original.parentNode.insertBefore(clone, original);
      CustomizableUI.registerToolbarNode(clone);

      if (CustomizableUI.getWidgetIdsInArea(NEW_ID).length === 0) {
        CustomizableUI.resetArea(NEW_ID);
      }

      console.log("Bottom toolbar ready");
      toolbarReady = true;
      return true;
    } catch (e) {
      console.error("Toolbar init failed:", e);
      return false;
    }
  }

  // -------------------- SIDEBAR PANEL --------------------
  function initSidebarPanel() {
    if (panelReady) return true;
    if (!window.CustomizableUI) return false;

    const stack = document.querySelector(".sidebar-browser-stack");
    if (!stack) return false;

    if (document.getElementById("sidebar-flex-container")) {
      panelReady = true;
      return true;
    }

    const browser = stack.querySelector("#sidebar");
    if (!browser) return false;

    try {
      // register sidebar panel as a real toolbar
      if (!CustomizableUI.getAreaType(PANEL_ID)) {
        CustomizableUI.registerArea(PANEL_ID, {
          type: CustomizableUI.TYPE_TOOLBAR,
          defaultPlacements: []
        });
      }

      // create container
      const hbox = document.createXULElement("hbox");
      hbox.id = "sidebar-flex-container";

      // create real customizable toolbar
      const panel = document.createXULElement("toolbar");
      panel.id = PANEL_ID;
      panel.setAttribute("customizable", "true");
      panel.setAttribute("mode", "icons");
      panel.setAttribute("iconsize", "small");

      // insert structure
      stack.appendChild(hbox);
      hbox.appendChild(browser);
      hbox.appendChild(panel);

      // register toolbar node
      CustomizableUI.registerToolbarNode(panel);

      // reset only if empty
      if (CustomizableUI.getWidgetIdsInArea(PANEL_ID).length === 0) {
        CustomizableUI.resetArea(PANEL_ID);
      }

      console.log("Sidebar panel ready");
      panelReady = true;
      return true;
    } catch (e) {
      console.error("Panel init failed:", e);
      return false;
    }
  }

  // -------------------- INIT LOOP --------------------
  function initAll() {
    const t = initToolbar();
    const p = initSidebarPanel();

    if (!(t && p)) {
      setTimeout(initAll, 50);
    }
  }

  initAll();
})();console.log("ZEN SCRIPT LOADED");

(function () {
  const SOURCE_ID = "zen-sidebar-foot-buttons";
  const NEW_ID = "zen-sidebar-custom-toolbar";

  function initToolbar() {
    if (!window.CustomizableUI) return false;

    // 🔥 register area early for persistence
    if (!CustomizableUI.getAreaType(NEW_ID)) {
      CustomizableUI.registerArea(NEW_ID, {
        type: CustomizableUI.TYPE_TOOLBAR,
        defaultPlacements: []
      });
    }

    const original = document.getElementById(SOURCE_ID);
    if (!original) return false;

    if (document.getElementById(NEW_ID)) return true;

    try {
      // clone native toolbar
      const clone = original.cloneNode(true);
      clone.id = NEW_ID;
      clone.setAttribute("toolbarname", "Custom Sidebar Toolbar");

      // remove inherited state
      clone.removeAttribute("currentset");
      clone.removeAttribute("defaultset");

      // 🔥 remove workspace button
      const workspaceButton = clone.querySelector("#zen-workspaces-button");
      if (workspaceButton) workspaceButton.remove();

      // insert into place
      original.parentNode.insertBefore(clone, original);

      // register toolbar
      CustomizableUI.registerToolbarNode(clone);

      // reset area only if empty
      const hasSavedState =
        CustomizableUI.getWidgetIdsInArea(NEW_ID).length > 0;
      if (!hasSavedState) {
        CustomizableUI.resetArea(NEW_ID);
      }

      console.log("Persistent toolbar ready (workspace button removed)");
      return true;
    } catch (e) {
      console.error("Init failed:", e);
      return false;
    }
  }

  function waitForUI() {
    if (!initToolbar()) setTimeout(waitForUI, 50);
  }

  waitForUI();
})();
