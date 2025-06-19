const Availability = require('../models/Availability');
const db = require('../config/database');

class AvailabilityController {
  static async create(req, res) {
    const { date, start_time, end_time } = req.body;
    const student_id = req.user.id;

    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'apenas estudantes' });
    }

    if (!date || !start_time || !end_time) {
      return res.status(400).json({ error: 'todos os campos são obrigatórios' });
    }

    try {
      // linka course_name a speciality
      const studentProfile = await db('student_profiles')
        .where({ user_id: student_id })
        .first();

      if (!studentProfile || !studentProfile.course_name) {
        return res.status(400).json({ error: 'Curso não encontrado no perfil acadêmico.' });
      }

      const specialty = studentProfile.course_name;

      const { total } = await Availability.countByDate(student_id, date);
      if (Number(total) >= 2) {
        return res.status(400).json({ error: 'limitado a 2 horários por dia' });
      }

      const overlap = await Availability.hasOverlap(student_id, date, start_time, end_time);
      if (overlap) {
        return res.status(400).json({ error: 'horário já existente' });
      }

      const availability = await Availability.create({
        student_id,
        date,
        start_time,
        end_time,
        specialty
      });

      return res.status(201).json(availability);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'erro na disponibilidade' });
    }
  }

  static async listByStudent(req, res) {
    const { studentId } = req.params;

    try {
      const slots = await Availability.getByStudentId(studentId);
      res.json(slots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'erro na busca' });
    }
  }

  static async getByDate(req, res) {
    const { date } = req.params;

    try {
      const results = await db('availability')
        .join('users', 'availability.student_id', '=', 'users.id')
        .where('availability.date', date)
        .andWhere('users.role', 'student')
        .select(
          'availability.id',
          'availability.date',
          'availability.start_time',
          'availability.end_time',
          'availability.specialty',
          'users.id as student_id',
          'users.name as student_name'
        );
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'erro na busca' });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const horario = await db('availability')
        .where({ id })
        .first();

      if (!horario) {
        return res.status(404).json({ error: 'Horário não encontrado.' });
      }

      if (req.user.role !== 'admin' && horario.student_id !== req.user.id) {
        return res.status(403).json({ error: 'Sem permissão para deletar este horário.' });
      }

      await db('availability').where({ id }).del();

      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar horário.' });
    }
  }


  
}



module.exports = AvailabilityController;