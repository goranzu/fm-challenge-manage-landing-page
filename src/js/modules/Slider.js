class Slider {
  constructor(sliderEl) {
    if (!(sliderEl instanceof Element)) {
      throw new Error("Invalid HTML Element");
    }

    this.slider = sliderEl;
    this.slidesContainer = this.slider.querySelector(".slides");
    this.slideArray = Array.from(this.slider.querySelectorAll(".slide"));
    this.controlButtons = this.slider.querySelectorAll(".controls > div");

    this.currentSlide =
      this.slidesContainer.querySelector(".current") ||
      this.slidesContainer.firstElementChild;

    this.nextSlide =
      this.currentSlide.nextElementSibling ||
      this.slidesContainer.firstElementChild;

    this.previousSlide =
      this.currentSlide.previousElementSibling ||
      this.slidesContainer.lastElementChild;

    this.applyClasses();

    this.controlButtons.forEach((button, index) =>
      button.addEventListener("click", (e) => {
        this.handleClick(e, index);
      }),
    );
  }

  applyClasses() {
    this.currentSlide.classList.add("current");
    this.nextSlide.classList.add("next");
    this.previousSlide.classList.add("previous");
  }

  removeClasses() {
    this.slideArray.forEach((slide) =>
      slide.classList.remove(...["current", "next", "previous"]),
    );
  }

  handleClick(e, buttonIndex) {
    this.removeClasses();

    this.controlButtons.forEach((buttons) =>
      buttons.classList.remove("active"),
    );

    this.slideArray.forEach((slide, slideIndex) => {
      if (slideIndex === buttonIndex) {
        this.currentSlide = this.slideArray[slideIndex];

        this.previousSlide =
          this.currentSlide.previousElementSibling ||
          this.slidesContainer.lastElementChild;

        this.nextSlide =
          this.currentSlide.nextElementSibling ||
          this.slidesContainer.firstElementChild;
      }
    });

    e.currentTarget.classList.add("active");
    this.applyClasses();
  }
}

export default Slider;
