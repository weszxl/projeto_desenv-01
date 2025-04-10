const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const GoogleCalendarService = require('../services/googleCalendar');
const { body, validationResult } = require('express-validator');
const { sendAppointmentConfirmation } = require('../services/emailService');
const authenticate = require('../middlewares/auth');


router.post(
  '/schedule',
  authenticate,
  [
    body('student_id').isNumeric().withMessage('ID do estudante inválido'),
    body('start_time').isISO8601().withMessage('Data de início inválida'),
    body('end_time').isISO8601().withMessage('Data de término inválida'),
    body('availability_id').optional().isNumeric().withMessage('ID de disponibilidade inválido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { student_id, start_time, end_time, availability_id } = req.body;
      const patient_id = req.user.id; // obter token JWT

      // verificar disponibilidade
      const { isAvailable, availableSlots } = await Appointment.isSlotAvailable(
        student_id, 
        start_time, 
        end_time
      );

      if (!isAvailable) {
        return res.status(400).json({ 
          error: "Conflito de horário",
          availableSlots: availableSlots || [] 
        });
      }

      // gerar link do Google Meet
      const meetLink = await GoogleCalendarService.createMeeting(start_time, end_time);

      // criar objeto de agendamento
      const appointmentData = {
        student_id,
        patient_id,
        start_time,
        end_time,
        google_meet_link: meetLink,
        availability_id // opcional: vincula a um slot de disponibilidade
      };

      // salvar no banco de dados
      const appointmentId = await Appointment.create(appointmentData);

      // enviar e-mail de confirmação (assíncrono talvez colocar um delay)
      sendAppointmentConfirmation(req.user.email, start_time, meetLink)
        .catch(console.error); // não quebra o fluxo se falhar

      res.status(201).json({ 
        id: appointmentId,
        meetLink,
        message: 'Consulta agendada!'
      });

    } catch (error) {
      console.error('Erro no agendamento:', error);
      res.status(500).json({ 
        error: 'Falha ao agendar consulta',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// nova rota para listar agendamentos do paciente
router.get('/my-appointments', authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.findByPatientId(req.user.id);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

module.exports = router;

