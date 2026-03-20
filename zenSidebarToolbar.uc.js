console.log("ZEN SCRIPT LOADED");

(function () {
  const SOURCE_ID = "zen-sidebar-foot-buttons";
  const NEW_ID = "zen-sidebar-custom-toolbar";

  function initToolbar() {
    if (!window.CustomizableUI) return false;

    // 🔥 register area EARLY (important for persistence)
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
      const clone = original.cloneNode(true);

      clone.id = NEW_ID;
      clone.setAttribute("toolbarname", "Custom Sidebar Toolbar");

      // remove inherited state ONLY on creation
      clone.removeAttribute("currentset");
      clone.removeAttribute("defaultset");

      original.parentNode.insertBefore(clone, original);

      CustomizableUI.registerToolbarNode(clone);

      // 🔥 ONLY reset if toolbar has never been customized
      const hasSavedState =
        CustomizableUI.getWidgetIdsInArea(NEW_ID).length > 0;

      if (!hasSavedState) {
        CustomizableUI.resetArea(NEW_ID);
      }

      console.log("Persistent toolbar ready");
      return true;

    } catch (e) {
      console.error("Init failed:", e);
      return false;
    }
  }

  function waitForUI() {
    if (!initToolbar()) {
      setTimeout(waitForUI, 50);
    }
  }

  waitForUI();
})();
