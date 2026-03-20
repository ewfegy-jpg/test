console.log("ZEN SCRIPT LOADED");

(function () {
  const AREA_ID = "zen-sidebar-custom-toolbar";

  function tryCreateToolbar() {
    const toolbox = document.getElementById("navigator-toolbox");
    if (!toolbox) return false;

    if (document.getElementById(AREA_ID)) return true;

    try {
      const toolbar = document.createXULElement("toolbar");
      toolbar.id = AREA_ID;

      // ✅ important attributes
      toolbar.setAttribute("customizable", "true");
      toolbar.setAttribute("class", "browser-toolbar customization-target");
      toolbar.setAttribute("mode", "icons");
      toolbar.setAttribute("iconsize", "small");
      toolbar.setAttribute("context", "toolbar-context-menu");
      toolbar.setAttribute("fullscreentoolbar", "true");
      toolbar.setAttribute("skipintoolbarset", "true");

      // insert near native Zen toolbar
      const ref = document.getElementById("zen-sidebar-foot-buttons");
      const parent = ref?.parentNode || toolbox;

      parent.insertBefore(toolbar, ref);

      // 🔥 THIS is what enables drag & drop
      if (typeof CustomizableUI !== "undefined") {
        CustomizableUI.registerArea(AREA_ID, {
          type: CustomizableUI.TYPE_TOOLBAR,
          defaultPlacements: []
        });
      }

      console.log("Customizable toolbar registered");
      return true;

    } catch (e) {
      console.error("Toolbar creation failed:", e);
      return false;
    }
  }

  function waitForUI() {
    if (!tryCreateToolbar()) setTimeout(waitForUI, 100);
  }

  waitForUI();
})();
