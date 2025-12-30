const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ name, email, mobile, subject, message }) => {
  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: ["dharaneeshm2023@gmail.com"],
    subject: "New Portfolio Contact Message",
    html: `
      <h3>New Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Mobile:</b> ${mobile}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  });
};

module.exports = sendEmail;


