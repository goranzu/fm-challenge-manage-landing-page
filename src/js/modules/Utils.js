class Utils {
  wait(ms = 500) {
    return new Promise((resovle) => {
      setTimeout(resovle, ms);
    });
  }

  focusTrap(element) {
    const focusableEls = element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
    );

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    first.focus();

    function trap(e) {
      const isTabPressed = e.key === "Tab" || e.keyCode === 9;

      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }

    // reference to remove eventlistener
    window.removeMe = trap;

    element.addEventListener("keydown", trap);
  }
}

export default Utils;
