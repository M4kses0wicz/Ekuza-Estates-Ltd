const input1 = document.querySelector(".inp1");
const label1 = document.querySelector(".l1");
const input2 = document.querySelector(".inp2");
const label2 = document.querySelector(".l2");
const messageTitle = document.getElementById("title");
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const hcaptchaToken = hcaptcha.getResponse();
  if (!hcaptchaToken) {
    alert("Please complete the captcha");
    return;
  }

  const formData = {
    title: document.getElementById("title").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    hcaptchaToken,
    interests: {
      "rent-to-rent": document.getElementById("rent-to-rent").checked,
      hmo: document.getElementById("hmo").checked,
      brr: document.getElementById("brr").checked,
      "guaranteed-rent": document.getElementById("guaranteed-rent").checked,
      other: document.getElementById("other").checked,
    },
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "/form-sent";
    } else {
      alert(data.error || "Failed to send message. Please try again.");
      hcaptcha.reset();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message. Please try again.");
    hcaptcha.reset();
  }
});

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

input1.addEventListener("input", () => {
  if (input1.value == "") {
    messageTitle.textContent = "Message";
  } else {
    messageTitle.textContent = input1.value;
  }
});

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
