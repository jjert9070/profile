let keyboardNavigation = false;

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Tab") keyboardNavigation = true;
  },
  true,
);

document.addEventListener(
  "pointerdown",
  () => {
    keyboardNavigation = false;
  },
  true,
);

document.addEventListener("keydown", (event) => {
  if (
    !keyboardNavigation ||
    event.defaultPrevented ||
    event.isComposing ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey
  )
    return;
  const direction = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
    event.key
  ];
  if (!direction) return;
  if (
    event.target.closest(
      "input, textarea, select, [contenteditable]:not([contenteditable='false'])",
    )
  )
    return;
  const current = event.target.closest("a[href], button, [tabindex]");
  if (!current) return;
  const scope = document.querySelector("dialog[open]") || document;
  const items = Array.from(
    scope.querySelectorAll(
      "a[href], button, input, select, textarea, [tabindex]",
    ),
  ).filter(
    (item) =>
      item.tabIndex >= 0 &&
      !item.disabled &&
      !item.closest("[inert]") &&
      item.getClientRects().length &&
      getComputedStyle(item).visibility !== "hidden",
  );
  const index = items.indexOf(current);
  if (index < 0) return;
  event.preventDefault();
  items[index + direction]?.focus();
});
