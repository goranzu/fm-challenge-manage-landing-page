import Navigation from "./modules/Navigation";
import Slider from "./modules/Slider";

const slider = new Slider(document.querySelector(".slider"));

new Navigation();

slider.init();
