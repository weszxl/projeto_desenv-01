const nodemailer = require('nodemailer');

// adicionar email de destinatário para teste (necessário gerar uma senha de aplicativo)
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
      subject: 'Consulta Agendada',
      html: `<p>Sua consulta está agendada para ${new Date(startTime).toLocaleString()}.</p>`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  module.exports = { sendAppointmentConfirmation };
  