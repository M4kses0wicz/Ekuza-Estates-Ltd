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
        <p><strong>Interests:</strong> ${selectedInterests || "None selected"}</p>
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
                <div class="wrapper" style="padding: 25px; font-family: sans-serif">
                <h2 style="margin: 20px; font-size: 36px">
                    New message from RENT TO RENT contact form!
                </h2>
                <ul>
                    <li style="margin: 5px"><strong>First Name:</strong> ${firstName}</li>
                    <li style="margin: 5px"><strong>Last Name:</strong> ${lastName}</li>
                    <li style="margin: 5px"><strong>Email:</strong> ${email}</li>
                    <li style="margin: 5px"><strong>Phone:</strong> ${phone}</li>
                    <li style="margin: 5px"><strong>Budget:</strong> ${budget}</li>
                </ul>
                <h3 style="margin: 10px 10px 10px 20px; font-size: 24px">
                    Additional Details:
                </h3>
                <p style="margin-left: 25px">
                    ${
                      message.replace(/\n/g, "<br />") ||
                      "No Additional Details."
                    }
                </p>
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
                <div class="wrapper" style="padding: 25px; font-family: sans-serif">
                <h2 style="margin: 20px; font-size: 36px">
                    New message from HMO contact form!
                </h2>
                <ul>
                    <li style="margin: 5px"><strong>First Name:</strong> ${firstName}</li>
                    <li style="margin: 5px"><strong>Last Name:</strong> ${lastName}</li>
                    <li style="margin: 5px"><strong>Email:</strong> ${email}</li>
                    <li style="margin: 5px"><strong>Phone:</strong> ${phone}</li>
                    <li style="margin: 5px"><strong>Budget:</strong> ${budget}</li>
                </ul>
                <h3 style="margin: 10px 10px 10px 20px; font-size: 24px">
                    Additional Details:
                </h3>
                <p style="margin-left: 25px">
                    ${
                      message.replace(/\n/g, "<br />") ||
                      "No Additional Details."
                    }
                </p>
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
                <div class="wrapper" style="padding: 25px; font-family: sans-serif">
                <h2 style="margin: 20px; font-size: 36px">
                    New message from BRR contact form!
                </h2>
                <ul>
                    <li style="margin: 5px"><strong>First Name:</strong> ${firstName}</li>
                    <li style="margin: 5px"><strong>Last Name:</strong> ${lastName}</li>
                    <li style="margin: 5px"><strong>Email:</strong> ${email}</li>
                    <li style="margin: 5px"><strong>Phone:</strong> ${phone}</li>
                    <li style="margin: 5px"><strong>Budget:</strong> ${budget}</li>
                </ul>
                <h3 style="margin: 10px 10px 10px 20px; font-size: 24px">
                    Additional Details:
                </h3>
                <p style="margin-left: 25px">
                    ${
                      message.replace(/\n/g, "<br />") ||
                      "No Additional Details."
                    }
                </p>
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
    const { title, email, message, hcaptchaToken, interests, date, time } = req.body;

    // const isHCaptchaValid = await verifyHCaptcha(hcaptchaToken);
    // if (!isHCaptchaValid) {
    //   return res.status(400).json({ error: "Invalid captcha" });
    // }

    if (!email || !message || !date || !time) {
      return res.status(400).json({ error: "Email, message, date, and time are required" });
    }

    const [timeString, meridian] = time.split(" ");
    let [hours, minutes] = timeString.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    const startDateTime = new Date(date);
    startDateTime.setHours(hours, minutes);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    const formatDateTime = (date) => date.toISOString().replace(/[-:]/g, "").split(".")[0];
    const googleCalendarLink = `https://www.google.com/calendar/render?text=${encodeURIComponent(
        title || "Meeting"
    )}&action=TEMPLATE&dates=${formatDateTime(startDateTime)}Z/${formatDateTime(endDateTime)}Z`;

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
      subject: `New Contact Form Submission: ${title || "No Title"}`,
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
        <p><strong>Interests:</strong> ${selectedInterests || "None selected"}</p>
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
