// zenSidebarToolbar.uc.js
console.log("ZEN SCRIPT LOADED");

(function () {
  const AREA_ID = "zen-sidebar-custom-toolbar";

  function tryCreateToolbar() {
    const container = document.getElementById("sidebar-main");
    if (!container) return false;

    if (document.getElementById(AREA_ID)) return true;

    try {
      const toolbar = document.createXULElement("toolbar");
      toolbar.id = AREA_ID;
      toolbar.setAttribute("customizable", "true");
      toolbar.setAttribute("class", "browser-toolbar customization-target");
      toolbar.setAttribute("mode", "icons");
      toolbar.setAttribute("iconsize", "small");
      toolbar.setAttribute("context", "toolbar-context-menu");

      container.appendChild(toolbar);
      console.log("Zen toolbar appended");
      return true;
    } catch (e) {
      console.error("Toolbar creation failed, retrying:", e);
      return false;
    }
  }

  function waitForSidebar() {
    if (!tryCreateToolbar()) setTimeout(waitForSidebar, 100);
  }

  waitForSidebar();
})();// zenSidebarToolbar.uc.js
console.log("ZEN SCRIPT LOADED");

(function () {
  const AREA_ID = "zen-sidebar-custom-toolbar";

  function tryCreateToolbar() {
    const container = document.getElementById("sidebar-main");
    if (!container) return false;

    if (document.getElementById(AREA_ID)) return true;

    try {
      const toolbar = document.createXULElement("toolbar");
      toolbar.id = AREA_ID;
      toolbar.setAttribute("customizable", "true");
      toolbar.setAttribute("class", "browser-toolbar customization-target");
      toolbar.setAttribute("mode", "icons");
      toolbar.setAttribute("iconsize", "small");
      toolbar.setAttribute("context", "toolbar-context-menu");

      container.appendChild(toolbar);
      console.log("Toolbar appended");
      return true;
    } catch (e) {
      console.log("Toolbar creation failed, retrying...", e);
      return false;
    }
  }

  function waitForSidebar() {
    if (!tryCreateToolbar()) setTimeout(waitForSidebar, 100);
  }

  waitForSidebar();
})();
