console.log("ZEN SCRIPT LOADED");

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
