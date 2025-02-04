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

const customSelectElements = document.querySelectorAll("select");

customSelectElements.forEach(function (select) {
  const classes = select.className;
  const id = select.id;
  const name = select.name;
  const placeholder = select.getAttribute("placeholder") || "Select an option";

  const customSelect = document.createElement("div");
  customSelect.className = `custom-select ${classes}`;

  const customTrigger = document.createElement("span");
  customTrigger.className = "custom-select-trigger";
  customTrigger.textContent = placeholder;
  customSelect.appendChild(customTrigger);

  const customOptions = document.createElement("div");
  customOptions.className = "custom-options";

  Array.from(select.options).forEach(function (option) {
    const customOption = document.createElement("span");
    customOption.className = `custom-option ${option.className}`;
    customOption.textContent = option.textContent;
    customOption.setAttribute("data-value", option.value);

    customOption.addEventListener("click", function () {
      select.value = this.getAttribute("data-value");
      customOptions
        .querySelectorAll(".custom-option")
        .forEach((opt) => opt.classList.remove("selection"));
      this.classList.add("selection");
      customTrigger.textContent = this.textContent;
      customSelect.classList.remove("opened");
    });

    customOptions.appendChild(customOption);
  });

  customSelect.appendChild(customOptions);

  const wrapper = document.createElement("div");
  wrapper.className = "custom-select-wrapper";
  select.style.display = "none";
  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  wrapper.appendChild(customSelect);

  customTrigger.addEventListener("click", function (event) {
    document
      .querySelectorAll(".custom-select")
      .forEach((el) => el.classList.remove("opened"));
    customSelect.classList.toggle("opened");
    event.stopPropagation();
  });
});

document.addEventListener("click", function () {
  document
    .querySelectorAll(".custom-select")
    .forEach((el) => el.classList.remove("opened"));
});

const twoWeeksFromNow = new Date();
twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
document.getElementById("date").min = twoWeeksFromNow
  .toISOString()
  .split("T")[0];

document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 14);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
});
