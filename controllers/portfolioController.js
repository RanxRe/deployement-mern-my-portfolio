const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

//transport function: to connect sendgrid account to nodemailer

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //email matter
    transporter.sendMail({
      to: "ranjeetk1999.gov@gmail.com",
      from: "ranjeetk1999.gov@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
      <h5>Detail information</h5>
      <ul>
      <li><p>Name:${name}</p></li>
      <li><p>Name:${email}</p></li>
      <li><p>Name:${msg}</p></li>
      </ul>
      `,
    });

    return res.status(200).send({ success: true, message: "Your message send Successfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};
module.exports = sendEmailController;
