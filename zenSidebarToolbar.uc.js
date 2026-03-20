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
      toolbar.setAttribute("customizable", "true");
      toolbar.setAttribute("class", "browser-toolbar customization-target");
      toolbar.setAttribute("mode", "icons");
      toolbar.setAttribute("iconsize", "small");
      toolbar.setAttribute("context", "toolbar-context-menu");

      // ✅ find a REAL child of toolbox
      const ref = document.getElementById("zen-sidebar-top-buttons");

      if (ref && ref.parentNode === toolbox) {
        toolbox.insertBefore(toolbar, ref.nextSibling);
      } else {
        toolbox.appendChild(toolbar);
      }

      console.log("Toolbar appended to navigator-toolbox");
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
