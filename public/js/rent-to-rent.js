const input1 = document.querySelector("#email");
const label1 = document.querySelector(".l-email");
const input2 = document.querySelector(".phone");
const label2 = document.querySelector(".l-phone");

const input3 = document.querySelector(".first-name");
const label3 = document.querySelector(".l-fn");
const input4 = document.querySelector(".last-name");
const label4 = document.querySelector(".l-ln");

input1.addEventListener("focus", () => toggleClass(input1, label1));
input1.addEventListener("input", () => toggleClass(input1, label1));
input1.addEventListener("blur", () => toggleClass(input1, label1));

input2.addEventListener("focus", () => toggleClass(input2, label2));
input2.addEventListener("input", () => toggleClass(input2, label2));
input2.addEventListener("blur", () => toggleClass(input2, label2));

input3.addEventListener("focus", () => toggleClass(input3, label3));
input3.addEventListener("input", () => toggleClass(input3, label3));
input3.addEventListener("blur", () => toggleClass(input3, label3));

input4.addEventListener("focus", () => toggleClass(input4, label4));
input4.addEventListener("input", () => toggleClass(input4, label4));
input4.addEventListener("blur", () => toggleClass(input4, label4));

const toggleClass = (input, label) => {
  if (input.value.trim() || document.activeElement === input) {
    label.classList.add("selected");
  } else {
    label.classList.remove("selected");
  }
};
