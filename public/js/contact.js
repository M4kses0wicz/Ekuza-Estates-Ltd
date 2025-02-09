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
