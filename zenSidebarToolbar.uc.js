console.log("ZEN SCRIPT LOADED");

(function () {
  const SOURCE_ID = "zen-sidebar-foot-buttons";
  const NEW_ID = "zen-sidebar-custom-toolbar";

  function tryCloneToolbar() {
    const original = document.getElementById(SOURCE_ID);
    if (!original) return false;

    if (document.getElementById(NEW_ID)) return true;

    try {
      // 🔥 deep clone
      const clone = original.cloneNode(true);

      // change id
      clone.id = NEW_ID;

      // clean state
      clone.removeAttribute("currentset");
      clone.removeAttribute("defaultset");

      // optional: give it a name
      clone.setAttribute("toolbarname", "Custom Sidebar Toolbar");

      // insert right above original
      original.parentNode.insertBefore(clone, original);

      // 🔥 register as NEW area
      if (window.CustomizableUI) {
        CustomizableUI.registerArea(NEW_ID, {
          type: CustomizableUI.TYPE_TOOLBAR,
          defaultPlacements: []
        });

        CustomizableUI.registerToolbarNode(clone);
      }

      console.log("Cloned toolbar created");
      return true;

    } catch (e) {
      console.error("Clone failed:", e);
      return false;
    }
  }

  function waitForUI() {
    if (!tryCloneToolbar()) setTimeout(waitForUI, 100);
  }

  waitForUI();
})();
