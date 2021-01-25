class Slider {
  constructor(sliderEl) {
    if (!(sliderEl instanceof Element)) {
      throw new Error("Invalid HTML Element");
    }

    this.slider = sliderEl;
    this.slidesContainer = this.slider.querySelector(".slides");
    this.slides = Array.from(this.slider.querySelectorAll(".slide"));
    this.controlButtons = Array.from(
      this.slider.querySelectorAll(".controls > div"),
    );

    this.index = 0;
    // All slides have the same width;
    this.slideWidth = this.slides[0].getBoundingClientRect().width;

    this.handleClick = this.handleClick.bind(this);

    // Update slide width if window resizes
    window.addEventListener("resize", () => {
      const slide = this.slider.querySelector(".slide");
      const width = slide.getBoundingClientRect().width;
      this.slideWidth = width;
    });
  }

  init() {
    // Set slides in correct position
    for (let i in this.slides) {
      if (i > 0) {
        this.slides[i].style.transform = `translateX(${i}00%)`;
      }
    }

    this.controlButtons.forEach((button) =>
      button.addEventListener("click", this.handleClick),
    );
    this.autoPlay();
  }

  handleClick(e) {
    const index = Number(e.currentTarget.dataset.index);
    const slideWidth = this.slides[index].getBoundingClientRect().width;
    this.index = index;

    // Update progress button.
    this.removeProgressButtonClasses();
    e.currentTarget.classList.add("active");

    // Move slides
    this.showSlide(index * slideWidth);
  }

  showSlide(pixels) {
    this.slidesContainer.style.transform = `translateX(-${pixels}px)`;
  }

  removeProgressButtonClasses() {
    this.controlButtons.forEach((b) => b.classList.remove("active"));
  }

  autoPlay(ms = 5000) {
    setInterval(() => {
      this.showSlide(this.index * this.slideWidth);
      this.removeProgressButtonClasses();
      this.controlButtons[this.index].classList.add("active");
      this.index++;
      if (this.index === this.slides.length) {
        this.index = 0;
      }
    }, ms);
  }
}

export default Slider;
