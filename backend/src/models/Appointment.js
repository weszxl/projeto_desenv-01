const db = require('../config/database');

const Appointment = {
  async create(data) {
    const [id] = await db('appointments').insert(data);
    return { id, ...data };
  },

  async updatePastAppointmentsToCompleted() {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; 
    const timeStr = now.toTimeString().slice(0, 8);

    await db('appointments')
      .where('status', 'scheduled')
      .andWhere(function () {
        this.where('date', '<', dateStr)
          .orWhere(function () {
            this.where('date', '=', dateStr)
              .andWhere('end_time', '<', timeStr);
          });
      })
      .update({ status: 'completed' });
  },

  async getByUserId(userId, role) {
    if (role === 'student') {
      return db('appointments as a')
        .leftJoin('users as u', 'a.patient_id', 'u.id')
        .leftJoin('patient_profiles as pp', 'pp.user_id', 'u.id')
        .leftJoin('availability as av', 'a.slot_id', 'av.id')
        .select(
          'a.*',
          'u.name as patient_name',
          'u.email as patient_email',
          'pp.photo_url as patient_photo',
          'av.specialty',
          'av.date as slot_date',
          'av.start_time as slot_start_time',
          'av.end_time as slot_end_time'
        )
        .where('a.student_id', userId)
        .orderBy('a.date', 'desc');
    } else if (role === 'patient') {
      return db('appointments as a')
        .leftJoin('users as u', 'a.student_id', 'u.id')
        .leftJoin('student_profiles as sp', 'sp.user_id', 'u.id')
        .leftJoin('availability as av', 'a.slot_id', 'av.id')
        .select(
          'a.*',
          'u.name as student_name',
          'u.email as student_email',
          'sp.photo_url as student_photo',
          'av.specialty',
          'av.date as slot_date',
          'av.start_time as slot_start_time',
          'av.end_time as slot_end_time'
        )
        .where('a.patient_id', userId)
        .orderBy('a.date', 'desc');
    } else {
      return [];
    }
  },

  async cancel({ appointmentId, userId, reason }) {
    return db('appointments')
      .where({ id: appointmentId })
      .update({
        status: 'cancelled',
        cancellation_requested_by: userId,
        cancellation_reason: reason || null,
        updated_at: new Date().toISOString()
      });
  },

  async isTimeTaken(student_id, date, start_time, end_time) {
    return db('appointments')
      .where({ student_id, date })
      .andWhere((q) => {
        q.whereBetween('start_time', [start_time, end_time])
         .orWhereBetween('end_time', [start_time, end_time]);
      })
      .first();
  },



  



};



module.exports = Appointment;



