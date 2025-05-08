const Appointment = require('../models/Appointment');
const GoogleCalendarService = require('../services/googleCalendar');
const { sendAppointmentConfirmation } = require('../services/emailService');

class AppointmentController {
  static async scheduleAppointment(req, res) {
    try {
      const { student_id, start_time, end_time, availability_id } = req.body;
      const patient_id = req.user.id;

      // verificar disponibilidade
      const { isAvailable, availableSlots } = await Appointment.isSlotAvailable(
        student_id, 
        start_time, 
        end_time
      );

      if (!isAvailable) {
        return res.status(409).json({ 
          error: "Conflito de horário",
          availableSlots: availableSlots || []
        });
      }

      // criar evento no Google Calendar ou calendário alternativo
      const meetLink = await GoogleCalendarService.createMeeting(start_time, end_time);

      // criar agendamento
      const appointmentData = {
        student_id,
        patient_id,
        start_time,
        end_time,
        google_meet_link: meetLink,
        availability_id
      };

      const appointmentId = await Appointment.create(appointmentData);

      // enviar e-mail de confirmação 
      // (EM .env DEVE SER ESPECIFICADO UM ENDEREÇO DE EMAIL 
      // E UMA SENHA DE APLICATIVO PARA O TESTE)
      await sendAppointmentConfirmation(req.user.email, start_time, meetLink);

      res.status(201).json({ 
        id: appointmentId,
        meetLink,
        message: 'Seu horário foi agendado!'
      });

    } catch (error) {
      console.error('Erro no agendamento:', error);
      res.status(500).json({ 
        error: 'Falha no agendamento',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  static async listAppointments(req, res) {
    try {
      const appointments = await Appointment.findByPatientId(req.user.id);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
  }
}

module.exports = AppointmentController;
