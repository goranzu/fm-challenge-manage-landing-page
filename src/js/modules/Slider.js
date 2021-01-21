class Slider {
  constructor(sliderEl) {
    if (!(sliderEl instanceof Element)) {
      throw new Error("Invalid HTML Element");
    }

    this.slider = sliderEl;
    this.sliderTrack = this.slider.querySelector(".slider-track");
    this.slides = this.slider.querySelectorAll(".slider-slide");
    this.controlButtons = this.slider.querySelectorAll(
      ".slider-controls > div",
    );

    this.currentSlide =
      this.sliderTrack.querySelector(".current") ||
      this.sliderTrack.firstElementChild;

    this.nextSlide =
      this.currentSlide.nextElementSibling ||
      this.sliderTrack.firstElementChild;

    this.previousSlide =
      this.currentSlide.previousElementSibling ||
      this.sliderTrack.lastElementChild;

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
    this.slides.forEach((slide) =>
      slide.classList.remove(...["current", "next", "previous"]),
    );
  }

  handleClick(e, buttonIndex) {
    this.removeClasses();

    this.controlButtons.forEach((buttons) =>
      buttons.classList.remove("active"),
    );

    this.slides.forEach((slide, slideIndex) => {
      if (slideIndex === buttonIndex) {
        this.currentSlide = this.slides[slideIndex];

        this.previousSlide =
          this.currentSlide.previousElementSibling ||
          this.sliderTrack.lastElementChild;

        this.nextSlide =
          this.currentSlide.nextElementSibling ||
          this.sliderTrack.firstElementChild;
      }
    });

    e.currentTarget.classList.add("active");
    this.applyClasses();
  }
}

export default Slider;
