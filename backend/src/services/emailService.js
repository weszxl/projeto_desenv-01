require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: `"Atendimento Plataforma" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`email enviado para ${to}`);
  } catch (err) {
    console.error('erro no envio:', err);
  }
}

module.exports = sendEmail;



  