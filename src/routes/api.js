const express = require("express");
const sgMail = require("@sendgrid/mail");
const router = express.Router();
const axios = require("axios");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const verifyHCaptcha = async (token) => {
  try {
    const res = axios.post("https://hcaptcha.com/siteverify", null, {
      params: {
        secret: process.env.HCAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    return res.data.success;
  } catch {
    return false;
  }
};

router.post("/contact", async (req, res) => {
  try {
    const { title, email, message, hcaptchaToken, interests } = req.body;

    const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    // if (!isHCaptchaValid) {
    //   return res.status(400).json({ error: "Invalid captcha" });
    // }

    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required" });
    }

    const selectedInterests = Object.entries(interests || {})
      .filter(([_, val]) => val)
      .map(([key]) => key)
      .join(", ");

    const emailData = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission: ${title || "No Title"}`,
      text: `
        New message from contact form:

        Title: ${title || "No Title"}
        Email: ${email}
        Interests: ${selectedInterests || "None selected"}

        Message:
        ${message}
      `,
      html: `
        <h2>New message from contact form</h2>
        <p><strong>Title:</strong> ${title || "No Title"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interests:</strong> ${
          selectedInterests || "None selected"
        }</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await sgMail.send(emailData);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.post("/rent-to-rent", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      budget,
      hcaptchaToken,
    } = req.body;

    const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    // if (!isHCaptchaValid) {
    //   return res.status(400).json({ error: "Invalid captcha" });
    // }

    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }

    const emailData = {
      from: process.env.RECIPIENT_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Rent to Rent Contact Form Submission!`,
      text: `
            New message from rent to rent contact form:
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Phone Number: ${phone}
            Budget: ${budget}
  
            Additional Details:
            ${message}
          `,
      html: `
              <div
                class="wrapper"
                style="
                  margin: 15px;
                  font-family: 'Trebuchet MS', sans-serif;
                  background: #fbf6ed;
                  border-radius: 7px;
                  color: #181113;
                  box-shadow: 5px 5px 20px #1811132c;
                  padding: 3px;
                "
              >
                <div
                  class="container"
                  style="
                    background: #fffdf8;
                    width: 100%;
                    margin: 100px 0px;
                    border-top: 14px double #f2ab40;
                    border-bottom: 14px double #f2ab40;
                  "
                >
                  <h2
                    style="
                      margin: 70px 0px 30px 0px;
                      font-size: 36px;
                      width: 100%;
                      text-align: center;
                    "
                  >
                    New message from RENT TO RENT contact form!
                  </h2>
                  <ul style="list-style-type: none; padding: 0">
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>First Name:</strong> ${firstName}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Last Name:</strong> ${lastName}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Email:</strong> ${email}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Phone:</strong> ${phone}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Budget:</strong> ${budget}
                    </li>
                  </ul>
                  <h3
                    style="
                      margin: 50px 0px 30px 0px;
                      font-size: 32px;
                      width: 100%;
                      text-align: center;
                    "
                  >
                    Additional Details:
                  </h3>
                  <p style="margin: 0px 15% 70px 15%; width: 70%; text-align: center">
                    ${
                      message.replace(/\n/g, "<br />") ||
                      "No Additional Details."
                    }
                  </p>
                </div>
              </div>
          `,
    };

    await sgMail.send(emailData);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.post("/HMO", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      budget,
      hcaptchaToken,
    } = req.body;

    const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    // if (!isHCaptchaValid) {
    //   return res.status(400).json({ error: "Invalid captcha" });
    // }

    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }

    const emailData = {
      from: process.env.RECIPIENT_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New HMO Contact Form Submission!`,
      text: `
              New message from HMO contact form:
              First Name: ${firstName}
              Last Name: ${lastName}
              Email: ${email}
              Phone Number: ${phone}
              Budget: ${budget}
    
              Additional Details:
              ${message}
            `,
      html: `
              <div
                class="wrapper"
                style="
                  margin: 15px;
                  font-family: 'Trebuchet MS', sans-serif;
                  background: #fbf6ed;
                  border-radius: 7px;
                  color: #181113;
                  box-shadow: 5px 5px 20px #1811132c;
                  padding: 3px;
                "
              >
                <div
                  class="container"
                  style="
                    background: #fffdf8;
                    width: 100%;
                    margin: 100px 0px;
                    border-top: 14px double #f2ab40;
                    border-bottom: 14px double #f2ab40;
                  "
                >
                  <h2
                    style="
                      margin: 70px 0px 30px 0px;
                      font-size: 36px;
                      width: 100%;
                      text-align: center;
                    "
                  >
                    New message from HMO contact form!
                  </h2>
                  <ul style="list-style-type: none; padding: 0">
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>First Name:</strong> ${firstName}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Last Name:</strong> ${lastName}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Email:</strong> ${email}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Phone:</strong> ${phone}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Budget:</strong> ${budget}
                    </li>
                  </ul>
                  <h3
                    style="
                      margin: 50px 0px 30px 0px;
                      font-size: 32px;
                      width: 100%;
                      text-align: center;
                    "
                  >
                    Additional Details:
                  </h3>
                  <p style="margin: 0px 15% 70px 15%; width: 70%; text-align: center">
                    ${
                      message.replace(/\n/g, "<br />") ||
                      "No Additional Details."
                    }
                  </p>
                </div>
              </div>
            `,
    };

    await sgMail.send(emailData);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.post("/BRR", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      budget,
      hcaptchaToken,
    } = req.body;

    const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    // if (!isHCaptchaValid) {
    //   return res.status(400).json({ error: "Invalid captcha" });
    // }

    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }

    const emailData = {
      from: process.env.RECIPIENT_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New BRR Contact Form Submission!`,
      text: `
                New message from BRR contact form:
                First Name: ${firstName}
                Last Name: ${lastName}
                Email: ${email}
                Phone Number: ${phone}
                Budget: ${budget}
      
                Additional Details:
                ${message}
              `,
      html: `
              <div
                class="wrapper"
                style="
                  margin: 15px;
                  font-family: 'Trebuchet MS', sans-serif;
                  background: #fbf6ed;
                  border-radius: 7px;
                  color: #181113;
                  box-shadow: 5px 5px 20px #1811132c;
                  padding: 3px;
                "
              >
                <div
                  class="container"
                  style="
                    background: #fffdf8;
                    width: 100%;
                    margin: 100px 0px;
                    border-top: 14px double #f2ab40;
                    border-bottom: 14px double #f2ab40;
                  "
                >
                  <h2
                    style="
                      margin: 70px 0px 30px 0px;
                      font-size: 36px;
                      width: 100%;
                      text-align: center;
                    "
                  >
                    New message from BRR contact form!
                  </h2>
                  <ul style="list-style-type: none; padding: 0">
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>First Name:</strong> ${firstName}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Last Name:</strong> ${lastName}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Email:</strong> ${email}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Phone:</strong> ${phone}
                    </li>
                    <li style="margin-top: 10px; width: 100%; text-align: center">
                      <strong>Budget:</strong> ${budget}
                    </li>
                  </ul>
                  <h3
                    style="
                      margin: 50px 0px 30px 0px;
                      font-size: 32px;
                      width: 100%;
                      text-align: center;
                    "
                  >
                    Additional Details:
                  </h3>
                  <p style="margin: 0px 15% 70px 15%; width: 70%; text-align: center">
                    ${
                      message.replace(/\n/g, "<br />") ||
                      "No Additional Details."
                    }
                  </p>
                </div>
              </div>
              `,
    };

    await sgMail.send(emailData);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.post("/bespoke", async (req, res) => {
  try {
    const { title, email, message, hcaptchaToken, interests, date, time } =
      req.body;

    // const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    // if (!isHCaptchaValid) {
    //   return res.status(400).json({ error: "Invalid captcha" });
    // }

    if (!email || !message || !date || !time) {
      return res
        .status(400)
        .json({ error: "Email, message, date, and time are required" });
    }

    const [timeString, meridian] = time.split(" ");
    let [hours, minutes] = timeString.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    const startDateTime = new Date(date);
    startDateTime.setHours(hours, minutes);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    const formatDateTime = (date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0];
    const googleCalendarLink = `https://www.google.com/calendar/render?text=${encodeURIComponent(
      title || "Meeting"
    )}&action=TEMPLATE&dates=${formatDateTime(startDateTime)}Z/${formatDateTime(
      endDateTime
    )}Z`;

    const selectedInterests = Object.entries(interests || {})
      .filter(([_, val]) => val)
      .map(([key]) => key)
      .join(", ");

    const clientEmailData = {
      to: email,
      from: process.env.RECIPIENT_EMAIL,
      subject: "We have received your request",
      text: `
        Thank you for reaching out to us! We will contact you shortly.

        Your message:
        ${message}

        If you would like to schedule a meeting, use the following link:
        ${googleCalendarLink}
      `,
      html: `
        <p>Thank you for reaching out to us! We will contact you shortly.</p>
        <h3>Your message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p>If you would like to schedule a meeting, use the following link:</p>
        <a href="${googleCalendarLink}" target="_blank">${googleCalendarLink}</a>
      `,
    };

    const adminEmailData = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.RECIPIENT_EMAIL,
      subject: `New Bespoke Deals Form Submission!"}`,
      text: `
        New message from contact form:

        Title: ${title || "No Title"}
        Email: ${email}
        Interests: ${selectedInterests || "None selected"}
        Date: ${date}
        Time: ${time}
        Google Calendar Link: ${googleCalendarLink}

        Message:
        ${message}
      `,
      html: `
        <h2>New message from contact form</h2>
        <p><strong>Title:</strong> ${title || "No Title"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interests:</strong> ${
          selectedInterests || "None selected"
        }</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Google Calendar Link:</strong> <a href="${googleCalendarLink}" target="_blank">${googleCalendarLink}</a></p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await Promise.all([
      sgMail.send(clientEmailData),
      sgMail.send(adminEmailData),
    ]);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.post("/guaranteed-rent", async (req, res) => {
  try {
    const { title, email, message, hcaptchaToken, interests, date, time } =
      req.body;

    // const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    // if (!isHCaptchaValid) {
    //   return res.status(400).json({ error: "Invalid captcha" });
    // }

    if (!email || !message || !date || !time) {
      return res
        .status(400)
        .json({ error: "Email, message, date, and time are required" });
    }

    const [timeString, meridian] = time.split(" ");
    let [hours, minutes] = timeString.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    const startDateTime = new Date(date);
    startDateTime.setHours(hours, minutes);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    const formatDateTime = (date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0];
    const googleCalendarLink = `https://www.google.com/calendar/render?text=${encodeURIComponent(
      title || "Meeting"
    )}&action=TEMPLATE&dates=${formatDateTime(startDateTime)}Z/${formatDateTime(
      endDateTime
    )}Z`;

    const selectedInterests = Object.entries(interests || {})
      .filter(([_, val]) => val)
      .map(([key]) => key)
      .join(", ");

    const clientEmailData = {
      to: email,
      from: process.env.RECIPIENT_EMAIL,
      subject: "We have received your request",
      text: `
        Thank you for reaching out to us! We will contact you shortly.

        Your message:
        ${message}

        If you would like to schedule a meeting, use the following link:
        ${googleCalendarLink}
      `,
      html: `
        <p>Thank you for reaching out to us! We will contact you shortly.</p>
        <h3>Your message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p>If you would like to schedule a meeting, use the following link:</p>
        <a href="${googleCalendarLink}" target="_blank">${googleCalendarLink}</a>
      `,
    };

    const adminEmailData = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.RECIPIENT_EMAIL,
      subject: `New Guaranteed rent Form Submission!"}`,
      text: `
        New message from contact form:

        Title: ${title || "No Title"}
        Email: ${email}
        Interests: ${selectedInterests || "None selected"}
        Date: ${date}
        Time: ${time}
        Google Calendar Link: ${googleCalendarLink}

        Message:
        ${message}
      `,
      html: `
        <h2>New message from contact form</h2>
        <p><strong>Title:</strong> ${title || "No Title"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interests:</strong> ${
          selectedInterests || "None selected"
        }</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Google Calendar Link:</strong> <a href="${googleCalendarLink}" target="_blank">${googleCalendarLink}</a></p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await Promise.all([
      sgMail.send(clientEmailData),
      sgMail.send(adminEmailData),
    ]);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
