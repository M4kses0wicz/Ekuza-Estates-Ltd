const input1 = document.querySelector(".inp1");
const label1 = document.querySelector(".l1");
const input2 = document.querySelector(".inp2");
const label2 = document.querySelector(".l2");
const messageTitle = document.getElementById("title");

const toggleClass = () => {
  if (input1.value.trim() || document.activeElement === input1) {
    label1.classList.add("selected");
  } else {
    label1.classList.remove("selected");
  }
};

const toggleClass2 = () => {
  if (input2.value.trim() || document.activeElement === input2) {
    label2.classList.add("selected");
  } else {
    label2.classList.remove("selected");
  }
};

input1.addEventListener("focus", toggleClass);
input1.addEventListener("input", toggleClass);
input1.addEventListener("blur", toggleClass);

input2.addEventListener("focus", toggleClass2);
input2.addEventListener("input", toggleClass2);
input2.addEventListener("blur", toggleClass2);
