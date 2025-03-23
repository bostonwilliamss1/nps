import setHeaderFooter from "./setHeaderFooter.mjs";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import "../css/style.css";
import "../css/visitor-center.css";
import {
  vcTitleTemplate,
  vcInfoTemplate,
  listTemplate,
  vcImageTemplate,
  vcAmenityTemplate,
  vcAddressesListTemplate,
  vcDirectionsTemplate,
  vcContactsTemplate,
  vcDetailsTemplate,
} from "./templates.mjs";

function getParam(param) {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

function renderCenterDetails(center) {
  // Update title
  document.querySelector(".vc-name").innerHTML = vcTitleTemplate(center.name);

  document.querySelector(".vc-info").innerHTML = vcInfoTemplate(center);

  const addressesHTML = vcAddressesListTemplate(center.addresses);
  const addressesBlock = vcDetailsTemplate({
    id: "vcAddresses",
    iconId: "heading-icon_map-pin",
    summary: "Addresses",
    content: addressesHTML,
  });

  const directionsHTML = vcDirectionsTemplate(center.directionsInfo);
  const directionsBlock = vcDetailsTemplate({
    id: "vcDirections",
    iconId: "directions",
    summary: "Directions",
    content: directionsHTML,
  });

  const amenitiesHTML = listTemplate(center.amenities, vcAmenityTemplate);
  const amenitiesBlock = vcDetailsTemplate({
    id: "vcAmenities",
    iconId: "heading-icon_info",
    summary: "Amenities",
    content: amenitiesHTML,
  });

  const contactHTML = vcContactsTemplate(center);
  const contactBlock = vcDetailsTemplate({
    id: "vcContact",
    iconId: "phone",
    summary: "Contact Information",
    content: contactHTML,
  });

  const detailsList = document.querySelector(".vc-details-list");
  detailsList.innerHTML =
    addressesBlock + directionsBlock + amenitiesBlock + contactBlock;

  const galleryList = document.querySelector(".vc-gallery ul");
  galleryList.innerHTML = center.images.map(vcImageTemplate).join("");
}

async function init() {
  const parkData = await getParkData();
  const id = getParam("id");
  const centerDetails = await getParkVisitorCenterDetails(id);

  setHeaderFooter(parkData);
  renderCenterDetails(centerDetails);
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "SUMMARY") {
    const allDetails = document.querySelectorAll('details[name="vc-details"]');
    allDetails.forEach((detail) => {
      if (detail !== e.target.parentElement) {
        detail.removeAttribute("open");
      }
    });
  }
});

init();
