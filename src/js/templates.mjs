import spritePath from "../images/sprite.symbol.svg";

export function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>`;
}

export function mediaCardTemplate(info) {
  return `<div class="media-card">
    <a href="${info.link}">
    <img src="${info.image}" alt="${info.name}" class="media-card__img">
    <h3 class="media-card__title">${info.name}</h3>
    </a>
   <p>${info.description}</p>
     </div>`;
}
function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}
function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice.phoneNumber;
}
export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div><p>${mailing.line1}<p>
    <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>
    `;
}

export function alertTemplate(alert) {
  let alertType = "";
  // most of the alerts are one word and line up with the icons nicely. "Park Closure" is the exception
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  return `<li class="alert">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="${spritePath}#alert-${alertType}"></use>
  </svg>
  <div>
    <h3 class="alert-${alertType}">${alert.title}</h3>
    <p>${alert.description}</p>
  </div></li>`;
}

export function visitorCenterTemplate(center) {
  console.log("center", center);
  return `<li class="visitor-center">
    <h4><a href="visitor-center.html?id=${center.id}">${center.name}</a></h4>
    <p>${center.description}</p>
    <p>${center.directionsInfo}</p>
  </li>`;
}

export function activityListTemplate(activities) {
  return activities.map((activity) => `<li>${activity.name}</li>`).join("");
}

export function vcDetailsTemplate({ id, iconId, summary, content }) {
  return `<details name="vc-details" id="${id}">
    <summary>
      <svg class="icon" role="presentation" focusable="false">
        <use xlink:href="/images/sprite.symbol.svg#${iconId}"></use>
      </svg>
      ${summary}
    </summary>
    ${content}
  </details>`;
}

// Already added ✅
export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}

// ✅ Title with icon
export function vcTitleTemplate(text) {
  return `<svg class="icon"><use xlink:href="/images/sprite.symbol.svg#ranger-station"></use></svg> ${text}`;
}

// ✅ Visitor center image + description
export function vcInfoTemplate(data) {
  const image = data.images[0];
  return `<figure>
            <img src="${image.url}" alt="${image.altText}" />
            <figcaption>${image.title} <span>${image.credit}</span></figcaption>
          </figure>
          <p>${data.description}</p>`;
}

// ✅ Individual gallery item
export function vcImageTemplate(data) {
  return `<li><img src="${data.url}" alt="${data.altText}"></li>`;
}

// ✅ Amenity list item
export function vcAmenityTemplate(data) {
  return `<li>${data}</li>`;
}

// ✅ Directions text
export function vcDirectionsTemplate(data) {
  return `<p>${data}</p>`;
}

// ✅ Addresses (physical & mailing)
export function vcAddressesListTemplate(data) {
  const physical = data.find((a) => a.type === "Physical");
  const mailing = data.find((a) => a.type === "Mailing");

  let html = "";

  if (physical) {
    html += `<section>
      <h3>Physical Address</h3>
      <address>
        ${physical.line1}<br />
        ${physical.city}, ${physical.stateCode} ${physical.postalCode}
      </address>
    </section>`;
  }

  if (mailing) {
    html += `<section>
      <h3>Mailing Address</h3>
      <address>
        ${mailing.line1}<br />
        ${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}
      </address>
    </section>`;
  }

  return html;
}

export function vcContactsTemplate(data) {
  const email = data.emailAddresses?.[0]?.emailAddress || "Unavailable";
  const phone = data.phoneNumbers?.[0]?.phoneNumber || "Unavailable";

  return `<section class="vc-contact__email">
            <h3>Email Address</h3>
            <a href="mailto:${email}">${email}</a>
          </section>
          <section class="vc-contact__phone">
            <h3>Phone numbers</h3>
            <a href="tel:+1${phone}">${phone}</a>
          </section>`;
}
