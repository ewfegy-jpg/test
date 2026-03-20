// zenSidebarToolbar.uc.js
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

      // 🔥 KEY PART — place it correctly
      const sidebar = document.getElementById("sidebar-box");

      if (sidebar) {
        // insert BEFORE sidebar so it's part of sidebar layout
        toolbox.insertBefore(toolbar, sidebar);
      } else {
        // fallback
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
