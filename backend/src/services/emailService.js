// arquivo de teste para enviar e-mail
// especificar email e senha de aplicativo
// em .env nos campos EMAIL_USER e EMAIL_PASSWORD

const nodemailer = require('nodemailer');
console.log('Email User:', process.env.EMAIL_USER); 
console.log('Email Password:', process.env.EMAIL_PASSWORD ? '(senha)' : 'Não definido'); 


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  const sendAppointmentConfirmation = async (to, startTime,) => {
    const mailOptions = {
      from: 'noreply@plataforma.com',
      to,
      subject: 'Horário Agendado',
      html: `<p>Reunião agendada para ${new Date(startTime).toLocaleString()}.</p>`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  module.exports = { sendAppointmentConfirmation };
  