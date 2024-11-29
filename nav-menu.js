const toast = document.querySelector(".toast");

const copyPhone = () => {
  navigator.clipboard.writeText("+44 7949 940893");
  toast.classList.add("copied");
  setTimeout(() => {
    toast.classList.remove("copied");
  }, 2000);
};
