const db = require('../config/database');
const Appointment = require('../models/Appointment');
const calendar = require('../config/googleAuth');
const sendEmail = require('../services/emailService');

class AppointmentController {
  static async create(req, res) {
    const { slot_id } = req.body;
    const patient_id = req.user.id;

    try {
      if (!slot_id) {
        return res.status(400).json({ error: 'Selecione um horário.' });
      }

      const slot = await db('availability').where({ id: slot_id }).first();
      if (!slot) return res.status(404).json({ error: 'Horário não encontrado.' });

      const { student_id, date, start_time, end_time } = slot;

      const conflito = await Appointment.isTimeTaken(student_id, date, start_time, end_time);
      if (conflito) {
        return res.status(400).json({ error: 'horário já agendado com este estudante' });
      }

      // cria evento api do gugli
      const event = {
        summary: 'Atendimento Psicológico',
        description: 'Sessão entre paciente e estudante',
        start: {
          dateTime: `${date}T${start_time}:00-03:00`,
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: `${date}T${end_time}:00-03:00`,
          timeZone: 'America/Sao_Paulo'
        },
        conferenceData: {
          createRequest: {
            requestId: `meet_${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        },
        attendees: []
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1
      });

      const meetLink = response.data.hangoutLink;

      const novo = await Appointment.create({
        patient_id,
        student_id,
        slot_id,
        date,
        start_time,
        end_time,
        status: 'scheduled',
        meet_link: meetLink
      });

      const paciente = await db('users').where({ id: patient_id }).first();
      const estudante = await db('users').where({ id: student_id }).first();

      await sendEmail({
        to: paciente.email,
        subject: 'Consulta confirmada',
        html: `
          <h3>Olá, ${paciente.name}!</h3>
          <p>Sua consulta foi agendada com o estudante <strong>${estudante.name}</strong>.</p>
          <p><strong>Data:</strong> ${date} <br />
          <strong>Horário:</strong> ${start_time} às ${end_time}</p>
          <p><strong>Link para a consulta (Google Meet):</strong><br />
          <a href="${meetLink}" target="_blank">${meetLink}</a></p>
        `
      });

      await sendEmail({
        to: estudante.email,
        subject: 'Nova consulta agendada',
        html: `
          <h3>Olá, ${estudante.name}!</h3>
          <p>Um paciente agendou um horário com você.</p>
          <p><strong>Paciente:</strong> ${paciente.name}<br />
          <strong>Data:</strong> ${date}<br />
          <strong>Horário:</strong> ${start_time} às ${end_time}</p>
          <p><strong>Link do Meet:</strong><br />
          <a href="${meetLink}" target="_blank">${meetLink}</a></p>
        `
      });

      res.status(201).json(novo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'erro ao criar agendamento' });
    }
  }

  static async list(req, res) {
    const userId = req.user.id;
    const role = req.user.role;

    try {
      const data = await Appointment.getByUserId(userId, role);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'erro em agendamentos' });
    }
  }
}

module.exports = AppointmentController;




