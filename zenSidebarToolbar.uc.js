const toolbar = document.createXULElement("toolbar");
toolbar.id = AREA_ID;

// 🔥 important attributes
toolbar.setAttribute("customizable", "true");
toolbar.setAttribute("class", "browser-toolbar");
toolbar.setAttribute("mode", "icons");
toolbar.setAttribute("iconsize", "small");
toolbar.setAttribute("context", "toolbar-context-menu");

// 🔥 THIS is the key part
const target = document.createXULElement("hbox");
target.id = AREA_ID + "-target";
target.setAttribute("class", "customization-target");
target.setAttribute("flex", "1");

// link them
toolbar.setAttribute("customizationtarget", target.id);

// append
toolbar.appendChild(target);
