import './css/header-nav-section.css';
import './css/hero-section.css';
import './css/about-us-section.css';
import './css/our-courses-section.css';
import './css/our-mentors-section.css';
import './css/sign-up-section.css';
import './css/reviews-section.css';
import './css/footer-section.css';

document.addEventListener("DOMContentLoaded", () => {
  const loadElements = document.querySelectorAll("load[src]");

  loadElements.forEach(async (element) => {
    const src = element.getAttribute("src");

    try {
      const response = await fetch(src);
      const html = await response.text();

      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;

      element.replaceWith(...wrapper.childNodes);
    } catch (error) {
      console.error("Parça yüklenemedi:", src, error);
    }
  });
});
