(function () {
const BUTTON_ID = "zen-workspaces-button";
const WRAPPER_CLASS = "zen-workspaces-button-wrapper";
const CLONE_CLASS = "zen-workspaces-button-clone";

let scheduled = false;

function createWrapper(container) {
let wrapper = container.querySelector(.${WRAPPER_CLASS});

if (!wrapper) {
  wrapper = document.createXULElement("hbox");
  wrapper.className = WRAPPER_CLASS;
  wrapper.setAttribute("align", "center");
  container.appendChild(wrapper);
}

return wrapper;

}

function initWorkspaceButtons() {
const originalBtn = document.getElementById(BUTTON_ID);
const workspaces = document.querySelectorAll("zen-workspace");

if (!originalBtn || !workspaces.length) return;

workspaces.forEach((ws, index) => {
  const container = ws.querySelector(".zen-current-workspace-indicator");
  if (!container) return;

  const wrapper = createWrapper(container);

  if (index === 0) {
    if (originalBtn.parentElement !== wrapper) {
      wrapper.appendChild(originalBtn);
    }
    return;
  }

  let clone = wrapper.querySelector(`.${CLONE_CLASS}`);

  if (!clone) {
    clone = originalBtn.cloneNode(true);
    clone.removeAttribute("id");
    clone.classList.add(CLONE_CLASS);
    wrapper.appendChild(clone);
  }
});

attachClickSync();
syncClonesFromOriginal();

}

function syncClonesFromOriginal() {
const originalBtn = document.getElementById(BUTTON_ID);
if (!originalBtn) return;

const activeBtn = originalBtn.querySelector('toolbarbutton[active="true"]');
if (!activeBtn) return;

const activeWorkspaceId = activeBtn.getAttribute("zen-workspace-id");
if (!activeWorkspaceId) return;

document.querySelectorAll(`.${CLONE_CLASS}`).forEach(clone => {
  clone.querySelectorAll("toolbarbutton").forEach(btn => {
    if (btn.getAttribute("zen-workspace-id") === activeWorkspaceId) {
      btn.setAttribute("active", "true");
    } else {
      btn.removeAttribute("active");
    }
  });
});

}

function attachClickSync() {
document.querySelectorAll(
#${BUTTON_ID} toolbarbutton, .${CLONE_CLASS} toolbarbutton
).forEach(btn => {
if (btn._workspaceSyncAttached) return;

  btn._workspaceSyncAttached = true;

  btn.addEventListener("click", () => {
    setTimeout(syncClonesFromOriginal, 100);
  });
});

}

function scheduleInit() {
if (scheduled) return;
scheduled = true;

requestAnimationFrame(() => {
  scheduled = false;
  initWorkspaceButtons();
});

}

const observer = new MutationObserver(() => {
scheduleInit();
});

observer.observe(document.body, {
childList: true,
subtree: true
});

setTimeout(initWorkspaceButtons, 300);
})();
