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
      const { total } = await Availability.countByDate(student_id, date);
      if (Number(total) >= 2) {
        return res.status(400).json({ error: 'limitado a 2 horários por dia' });
      }

      const overlap = await Availability.hasOverlap(student_id, date, start_time, end_time);
      if (overlap) {
        return res.status(400).json({ error: 'horário já existente' });
      }

      const availability = await Availability.create({ student_id, date, start_time, end_time });
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
      const results = await db('availabilities')
        .join('users', 'availabilities.student_id', '=', 'users.id')
        .where('availabilities.date', date)
        .andWhere('users.role', 'student')
        .select(
          'availabilities.id',
          'availabilities.date',
          'availabilities.start_time',
          'availabilities.end_time',
          'users.id as student_id',
          'users.name as student_name'
        );

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'erro na busca' });
    }
  }
}

module.exports = AvailabilityController;



