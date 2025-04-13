const Availability = require('../models/Availability');

class AvailabilityController {
  static async createAvailability(req, res) {
    try {
      const { start_time, end_time } = req.body;
      const availabilityData = {
        student_id: req.user.id,
        start_time,
        end_time
      };

      const availabilityId = await Availability.create(availabilityData);
      res.status(201).json({ id: availabilityId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar disponibilidade' });
    }
  }

  static async listByStudent(req, res) {
    try {
      const availability = await Availability.findByStudentId(req.params.student_id);
      res.json(availability);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar disponibilidade' });
    }
  }
}

module.exports = AvailabilityController;
