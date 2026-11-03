document.querySelectorAll("[data-certificate-belt]").forEach((root) => {
  if (root.dataset.ready) return;
  root.dataset.ready = "true";

  const rail = root.querySelector("[data-rail]");
  const list = root.querySelector("[data-list]");
  const dialog = root.querySelector("[data-dialog]");
  const largeImage = root.querySelector("[data-dialog-image]");
  const title = root.querySelector("[data-dialog-title]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let previousTime = 0;
  let opener;
  let animation;
  let closing = false;
  let previousOverflow = "";
  let drag;
  let suppressClick = false;

  rail.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY))
        return;
      if (!event.cancelable || rail.scrollWidth <= rail.clientWidth) return;
      event.preventDefault();
      stop();
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? rail.clientWidth
            : 1;
      move(event.deltaX * unit);
    },
    { passive: false },
  );

  rail.addEventListener("dragstart", (event) => event.preventDefault());
  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    stop();

    suppressClick = false;
    drag = {
      id: event.pointerId,
      start: event.clientX,
      last: event.clientX,
      moved: false,
    };
  });
  window.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    if (!drag.moved && Math.abs(event.clientX - drag.start) < 6) return;
    if (!drag.moved) rail.setPointerCapture(event.pointerId);
    drag.moved = true;
    event.preventDefault();
    move(drag.last - event.clientX);
    drag.last = event.clientX;
  });
  function endDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    suppressClick = drag.moved;
    drag = undefined;
    if (rail.hasPointerCapture(event.pointerId))
      rail.releasePointerCapture(event.pointerId);
  }
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  rail.addEventListener("lostpointercapture", endDrag);
  rail.addEventListener(
    "click",
    (event) => {
      if (!suppressClick || event.detail === 0) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
  }

  function itemWidth() {
    if (!list.firstElementChild) return 0;
    return (
      list.firstElementChild.getBoundingClientRect().width +
      (parseFloat(getComputedStyle(list).columnGap) || 0)
    );
  }

  function wrapScroll(position = rail.scrollLeft) {
    const width = itemWidth();
    if (!width || list.children.length < 2) return;
    // shortcut: a mostly visible collection has no room for a full buffer; keep native scrolling until more cards exist.
    if (list.offsetWidth - rail.clientWidth < width * 1.5) return;
    while (position < width * 0.25) {
      list.prepend(list.lastElementChild);
      position += width;
    }
    while (position >= width * 1.25) {
      list.append(list.firstElementChild);
      position -= width;
    }
    if (Math.abs(rail.scrollLeft - position) > 0.5) rail.scrollLeft = position;
  }

  function move(distance) {
    if (rail.scrollWidth <= rail.clientWidth || list.children.length < 2)
      return;
    if (list.offsetWidth - rail.clientWidth < itemWidth() * 1.5) {
      rail.scrollLeft += distance;
      return;
    }
    wrapScroll(rail.scrollLeft + distance);
  }

  rail.addEventListener("scroll", () => wrapScroll(), { passive: true });
  wrapScroll();

  function start(direction) {
    stop();
    if (reducedMotion.matches || dialog.open || document.hidden) return;
    function tick(time) {
      if (previousTime)
        move(direction * Math.min(time - previousTime, 40) * 0.16);
      previousTime = time;
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }

  root.querySelectorAll("[data-direction]").forEach((button) => {
    const direction = Number(button.dataset.direction);
    button.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") start(direction);
    });
    button.addEventListener("pointerleave", stop);
    button.addEventListener("pointercancel", stop);
    button.addEventListener("pointerdown", stop);
    button.addEventListener("click", () => {
      stop();

      const distance = direction * itemWidth();
      if (reducedMotion.matches) return move(distance);
      let started;
      let moved = 0;
      function slide(time) {
        started ??= time;
        const progress = Math.min((time - started) / 280, 1);
        const next = distance * (1 - (1 - progress) ** 3);
        move(next - moved);
        moved = next;
        frame = progress < 1 ? requestAnimationFrame(slide) : 0;
      }
      frame = requestAnimationFrame(slide);
    });
  });

  function restore() {
    closing = false;
    document.documentElement.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  }

  function close() {
    if (!dialog.open || closing) return;
    closing = true;
    animation?.cancel();
    if (reducedMotion.matches) {
      dialog.close();
      return;
    }
    animation = dialog.animate(
      [
        { opacity: 1, transform: "scale(1) translateY(0)" },
        { opacity: 0, transform: "scale(.94) translateY(12px)" },
      ],
      { duration: 160, easing: "ease-in" },
    );
    animation.finished.then(() => dialog.close()).catch(() => {});
  }

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preview]");
    if (!button || dialog.open) return;
    stop();
    opener = button;
    title.textContent = button.dataset.title;
    largeImage.src = button.dataset.image;
    largeImage.alt = `${button.dataset.title} completion certificate`;
    previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    if (!reducedMotion.matches) {
      animation = dialog.animate(
        [
          { opacity: 0, transform: "scale(.92) translateY(18px)" },
          { opacity: 1, transform: "scale(1) translateY(0)" },
        ],
        { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    }
  });

  root.querySelector("[data-close]").addEventListener("click", close);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("close", restore);
  rail.addEventListener("focusin", stop);
  root.addEventListener("pointerleave", stop);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });
  reducedMotion.addEventListener("change", () => {
    stop();
  });
  window.addEventListener("pagehide", () => {
    stop();
  });
});
