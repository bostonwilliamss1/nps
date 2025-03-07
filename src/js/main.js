import "../css/style.css";
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target.closest("button");
    document.querySelector(".global-nav").classList.toggle("show");

    target.setAttribute(
      "aria-expanded",
      document.querySelector(".global-nav").classList.contains("show")
    );

    console.log("toggle");
  });

  subMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (ev) => {
      let target = ev.target.closest("button");
      let subMenu = target.nextElementSibling;

      if (subMenu && subMenu.classList.contains("global-nav__list")) {
        const isExpanded = subMenu.classList.contains("show");

        document.querySelectorAll(".global-nav__list").forEach((menu) => {
          menu.classList.remove("show");
          menu.previousElementSibling.setAttribute("aria-expanded", false);
        });
        subMenu.classList.toggle("show", !isExpanded);
        target.setAttribute("aria-expanded", !isExpanded);
      }
    });
  });
}

init();
enableNavigation();
