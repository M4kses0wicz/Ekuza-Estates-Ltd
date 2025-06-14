const toast = document.querySelector(".toast");
const toastFooter = document.querySelector(".toast-footer");

const menu = document.querySelector(".menu");
const filter = document.querySelector(".filter");
const container = document.querySelector(".dropdown-menu-container");

const listener = document.querySelector(".event-listener");

const loader = document.querySelector(".loader");

const currentYear = new Date().getFullYear();

const copyPhone = () => {
  navigator.clipboard.writeText("07949940893");
  toast.classList.add("copied");
  setTimeout(() => {
    toast.classList.remove("copied");
  }, 2000);
};

const copyPhoneFooter = () => {
  navigator.clipboard.writeText("07949940893");
  toastFooter.classList.add("copied");
  setTimeout(() => {
    toastFooter.classList.remove("copied");
  }, 2000);
};

function closeMenu() {
  menu.classList.remove("opened");
  filter.classList.remove("opened");
  document.querySelector("body").classList.remove("loading");
  setTimeout(() => {
    container.classList.remove("opened");
  }, 750);
}

listener.addEventListener("click", closeMenu);

function openMenu() {
  container.classList.add("opened");
  setTimeout(() => {
    document.querySelector("body").classList.add("loading");
    menu.classList.add("opened");
    filter.classList.add("opened");
  }, 10);
}

window.addEventListener("load", () => {
  document.querySelector("body").classList.remove("loading");
  loader.classList.add("loaded");
});

document.getElementById("date").textContent = currentYear;

configObj = {
  buttonD:
    "M8 17.333h5.333v4C13.333 22.806 14.527 24 16 24c1.473 0 2.667-1.194 2.667-2.667v-4H24L16 8l-8 9.333z",
  buttonT:
    "translate(-1088 -172) translate(832 140) translate(32 32) translate(224)",
  shadowSize:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  roundnessSize: "16px",
  buttonDToBottom: "40px",
  buttonDToRight: "40px",
  selectedBackgroundColor: "#f2ab40",
  selectedIconColor: "#181113",
  buttonWidth: "57.5px",
  buttonHeight: "57.5px",
  svgWidth: "53.5px",
  svgHeight: "53.5px",
};
function createButton(obj, pageSimulator) {
  const body = document.querySelector("body");
  backToTopButton = document.createElement("span");
  backToTopButton.classList.add("softr-back-to-top-button");
  backToTopButton.id = "softr-back-to-top-button";
  pageSimulator
    ? pageSimulator.appendChild(backToTopButton)
    : body.appendChild(backToTopButton);
  backToTopButton.style.width = obj.buttonWidth;
  backToTopButton.style.height = obj.buttonHeight;
  backToTopButton.style.marginRight = obj.buttonDToRight;
  backToTopButton.style.marginBottom = obj.buttonDToBottom;
  backToTopButton.style.borderRadius = obj.roundnessSize;
  backToTopButton.style.boxShadow = obj.shadowSize;
  backToTopButton.style.color = obj.selectedBackgroundColor;
  backToTopButton.style.backgroundColor = obj.selectedBackgroundColor;
  pageSimulator
    ? (backToTopButton.style.position = "absolute")
    : (backToTopButton.style.position = "fixed");
  backToTopButton.style.outline = "none";
  backToTopButton.style.bottom = "0px";
  backToTopButton.style.right = "0px";
  backToTopButton.style.cursor = "pointer";
  backToTopButton.style.textAlign = "center";
  backToTopButton.style.border = "solid 2px currentColor";
  backToTopButton.innerHTML =
    '<svg class="back-to-top-button-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" > <g fill="none" fill-rule="evenodd"> <path d="M0 0H32V32H0z" transform="translate(-1028 -172) translate(832 140) translate(32 32) translate(164) matrix(1 0 0 -1 0 32)" /> <path class="back-to-top-button-img" fill-rule="nonzero" d="M11.384 13.333h9.232c.638 0 .958.68.505 1.079l-4.613 4.07c-.28.246-.736.246-1.016 0l-4.613-4.07c-.453-.399-.133-1.079.505-1.079z" transform="translate(-1028 -172) translate(832 140) translate(32 32) translate(164) matrix(1 0 0 -1 0 32)" /> </g> </svg>';
  backToTopButtonSvg = document.querySelector(".back-to-top-button-svg");
  backToTopButtonSvg.style.verticalAlign = "middle";
  backToTopButtonSvg.style.margin = "auto";
  backToTopButtonSvg.style.justifyContent = "center";
  backToTopButtonSvg.style.width = obj.svgWidth;
  backToTopButtonSvg.style.height = obj.svgHeight;
  backToTopButton.appendChild(backToTopButtonSvg);
  backToTopButtonImg = document.querySelector(".back-to-top-button-img");
  backToTopButtonImg.style.fill = obj.selectedIconColor;
  backToTopButtonSvg.appendChild(backToTopButtonImg);
  backToTopButtonImg.setAttribute("d", obj.buttonD);
  backToTopButtonImg.setAttribute("transform", obj.buttonT);
  if (!pageSimulator) {
    backToTopButton.style.display = "none";
    window.onscroll = function () {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    };
    backToTopButton.onclick = function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  }
}
document.addEventListener("DOMContentLoaded", function () {
  createButton(configObj, null);
});

console.log(
  "† - made by Maksymilian Klemensowicz (M4kses0wicz on github - contact@klemensowicz.pl)"
);

const burger = document.querySelector(".burger");
const x = document.querySelector(".x");
const phone = document.querySelector(".whatsapp");
const phonef = document.querySelector(".cws");
burger.addEventListener("click", openMenu);
x.addEventListener("click", closeMenu);
phone.addEventListener("click", copyPhone);
phonef.addEventListener("click", copyPhoneFooter);
