import { getParkData } from "./parkService.mjs";

const parkData = getParkData();
const disclaimer = document.querySelector(".disclaimer > a");
const title = document.querySelector("title");
const image = document.querySelector(".hero-banner > img");
const heroBannerContent = document.querySelector(".hero-banner__content");
const introContent = document.querySelector(".intro");
const infoContent = document.querySelector(".info");
const contactContent = document.querySelector(".contact");

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: parkData.images[2].url,
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];

function setHeaderData() {
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

function setIntroData() {
  const name = parkData.fullName;
  const description = parkData.description;
  function parkIntroTemplate() {
    return `<h1>${name}</h1>
    <p>${description}</p>`;
  }
  introContent.innerHTML = parkIntroTemplate();
}

function mediaCardData() {
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
  console.log("phone", phone);
  return phone.phoneNumber;
}

function ContactInfoData() {
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

setHeaderData();
setIntroData();
mediaCardData();
ContactInfoData();