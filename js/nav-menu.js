const toast = document.querySelector(".toast");

const menu = document.querySelector(".menu");
const filter = document.querySelector(".filter");
const container = document.querySelector(".dropdown-menu-container");

const loader = document.querySelector(".loader");

const copyPhone = () => {
  navigator.clipboard.writeText("+44 7949 940893");
  toast.classList.add("copied");
  setTimeout(() => {
    toast.classList.remove("copied");
  }, 2000);
};

function closeMenu() {
  menu.classList.remove("opened");
  filter.classList.remove("opened");
  setTimeout(() => {
    container.classList.remove("opened");
  }, 750);
}

function openMenu() {
  container.classList.add("opened");
  setTimeout(() => {
    menu.classList.add("opened");
    filter.classList.add("opened");
  }, 10);
}

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector("body").classList.remove("loading");
    loader.classList.add("loaded");
  }, 1000);
});
