import { getParkData } from "./parkService.mjs";
import { getInfoLinks } from "./parkService.mjs";

const disclaimer = document.querySelector(".disclaimer > a");
const title = document.querySelector("title");
const image = document.querySelector(".hero-banner > img");
const heroBannerContent = document.querySelector(".hero-banner__content");
const introContent = document.querySelector(".intro");
const infoContent = document.querySelector(".info");
const contactContent = document.querySelector(".contact");

function setHeaderData(parkData) {
  disclaimer.href = parkData.url;
  disclaimer.innerHTML = parkData.fullName;
  title.innerHTML = parkData.name;
  image.src = parkData.images[0].url;
  function parkInfoTemplate(info) {
      return `<a href="/" class="hero-banner__title">${info.name}</a>
      <p class="hero-banner__subtitle">
        <span>${info.designation}</span>
        <span>${info.states}</span>
      </p>`;
    }
  heroBannerContent.innerHTML = parkInfoTemplate(parkData);
}

function setIntroData(parkData) {
  function parkIntroTemplate(parkData) {
    return `<h1>${parkData.fullName}</h1>
    <p>${parkData.description}</p>`;
  }
  introContent.innerHTML = parkIntroTemplate(parkData);
}

function mediaCardData(parkInfoLinks) {
  function mediaCardTemplate(info) {
    return (
      `<div class="infoBox">
      <img src="${info.image}" alt="${info.name} class="infoimg">
      <h3>${info.name}</h3>
      <p>${info.description}</p>
      </div>`
    )
  }
  infoContent.innerHTML = parkInfoLinks.map(mediaCardTemplate).join('');
}

function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}

function getVoicePhone(phoneNumbers) {
  const phone = phoneNumbers.find((phone) => phone.type === "Voice");
  return phone.phoneNumber;
}

function ContactInfoData(parkData) {
  function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers)
    
    return `<div class="contact" style="position: relative; display: inline-block; text-align: center;">
    <img src="./images/footerbackground.png" alt="background" style="width:100%; height: auto;">
    <section>
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div><p>${mailing.line1}<p>
    <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
    <h4>Phone:</h4>
    <p>${voice}</p>
    </section>
    </div>`;
  }
  contactContent.innerHTML = footerTemplate(parkData);
}
async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);

  setHeaderData(parkData);
  ContactInfoData(parkData);
  setIntroData(parkData);
  mediaCardData(links);

}

init();