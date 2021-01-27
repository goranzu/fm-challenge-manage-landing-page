import Utils from "./Utils";

class Navigation extends Utils {
  constructor() {
    super();

    this.openNavButton = document.querySelector(".open-nav-button");
    this.closeNavButton = document.querySelector(".close-nav-button");
    this.overlay = document.querySelector(".overlay");
    this.mobileNav = this.overlay.querySelector(".mobile-nav");

    this.openNavButton.addEventListener("click", () => this.handleOpenNav());
    this.closeNavButton.addEventListener("click", () => this.handleCloseNav());
    this.mobileNav.addEventListener("click", async (e) => {
      if (e.target.tagName === "A") {
        await this.wait(100);
        this.handleCloseNav();
      }
    });
  }

  handleOpenNav() {
    this.overlay.classList.add("open");
    this.focusTrap(this.overlay);
  }

  handleCloseNav() {
    this.overlay.classList.remove("open");
    // Remove focus trap event listener
    this.overlay.removeEventListener("keydown", window.removeMe);
  }
}

export default Navigation;
