const db = require('../config/database');

class Appointment {
  static async create(appointmentData) {
    return db.transaction(async (trx) => {
      // demarcar disponibilidade como ocupado
      if (appointmentData.availability_id) {
        await trx('availability')
          .where({ id: appointmentData.availability_id })
          .update({ is_booked: true });
      }

      // criar o agendamento
      const [id] = await trx('appointments').insert(appointmentData);
      return id;
    });
  }

  static async isSlotAvailable(studentId, startTime, endTime) {
    const appointmentsConflict = await db('appointments')
      .where('student_id', studentId)
      .andWhere(function() {
        this.whereBetween('start_time', [startTime, endTime])
           .orWhereBetween('end_time', [startTime, endTime]);
      });

    // verificar slots marcados como disponíveis e não ocupados
    const availabilityConflict = await db('availability')
      .where('student_id', studentId)
      .andWhere('is_booked', false)
      .andWhere(function() {
        this.whereBetween('start_time', [startTime, endTime])
           .orWhereBetween('end_time', [startTime, endTime]);
      });

    return {
      isAvailable: appointmentsConflict.length === 0,
      availableSlots: availabilityConflict 
    };
  }

  static async findByStudentId(studentId) {
    return db('appointments').where({ student_id: studentId });
  }
  static async findByPatientId(patientId) {
    return db('appointments')
      .where('patient_id', patientId)
      .orderBy('start_time', 'desc');
  }
  

}

module.exports = Appointment;
