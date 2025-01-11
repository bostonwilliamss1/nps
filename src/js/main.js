import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

const title = document.querySelector("title");

title.innerHTML = parkData.name;

const image = document.querySelector(".hero-banner > img");

image.src = parkData.images[0].url;

function parkInfoTemplate(info) {
    console.log("parkdata", info.name, info.designation, info.states);
    return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>`;
  }

const heroBannerContent = document.querySelector(".hero-banner__content");
heroBannerContent.innerHTML = parkInfoTemplate(parkData);