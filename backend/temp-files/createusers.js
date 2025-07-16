const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './dev.sqlite3' },
  useNullAsDefault: true
});
const bcrypt = require('bcryptjs');

async function seed() {
  // Professores
  const profs = [
    { name: 'Jailson Sednem', email: 'jailson@exemplo.com', password: 'senha123', role: 'professor' },
    { name: 'Maria Tantan', email: 'maria@exemplo.com', password: 'senha123', role: 'professor' }
  ];

  // Crie professores
  const profIds = [];
  for (const prof of profs) {
    const hash = await bcrypt.hash(prof.password, 10);
    let existente = await knex('users').where({ email: prof.email }).first();
    if (!existente) {
      const [id] = await knex('users').insert({
        name: prof.name,
        email: prof.email,
        password_hash: hash,
        role: 'professor'
      });
      profIds.push(id);
    } else {
      profIds.push(existente.id);
    }
  }

  // Pacientes
  const pacientes = [
    { name: 'Dona Euclides', email: 'euclides@don888.com', password: 'senha123', role: 'patient', completo: true },
    { name: 'Jairo Tamandua', email: 'tamandua@ejairo.com', password: 'senha123', role: 'patient', completo: true },
    { name: 'João Caio da Rosa Silveira Fagundes', email: 'jc@caio.com', password: 'senha123', role: 'patient', completo: false }
  ];

  const pacienteIds = [];
  for (let i = 0; i < pacientes.length; i++) {
    const pac = pacientes[i];
    const hash = await bcrypt.hash(pac.password, 10);
    let existente = await knex('users').where({ email: pac.email }).first();
    let userId;
    if (!existente) {
      const [id] = await knex('users').insert({
        name: pac.name,
        email: pac.email,
        password_hash: hash,
        role: 'patient'
      });
      userId = id;
    } else {
      userId = existente.id;
    }
    pacienteIds.push(userId);

    if (pac.completo) {
      await knex('patient_profiles').insert({
        user_id: userId,
        phone: '1199999000' + (i + 1),
        birth: '1990-01-0' + (i + 1),
        cep: '0100100' + (i + 1),
        about: 'Paciente exemplo ' + (i + 1),
        photo_url: 'https://placehold.co/100x100',
        profile_completed: true
      });
    } else {
      await knex('patient_profiles').insert({
        user_id: userId,
        phone: null,
        birth: null,
        cep: null,
        about: null,
        photo_url: null,
        profile_completed: false
      });
    }
  }

  // Estudantes
  const estudantes = [
    // Jailson: 3 estudantes
    { name: 'Clara Frufru', email: 'clara@fru.com', password: 'senha123', professorIdx: 0, completo: true },
    { name: 'João Goulart', email: 'jango@jango.com', password: 'senha123', professorIdx: 0, completo: true },
    { name: 'Milena Cintia', email: 'uml@cintia.com', password: 'senha123', professorIdx: 0, completo: false },
    // Maria: 3 estudantes
    { name: 'Cypher da Silva', email: 'cysilva@cypher.com', password: 'senha123', professorIdx: 1, completo: true },
    { name: 'Muriel Vargas', email: 'muri@vargas.com', password: 'senha123', professorIdx: 1, completo: true },
    { name: 'Maria Euclides', email: '3maria@clides.com', password: 'senha123', professorIdx: 1, completo: false }
  ];

  const estudantesCompletos = [];
  const estudanteIds = [];

  for (let i = 0; i < estudantes.length; i++) {
    const est = estudantes[i];
    const hash = await bcrypt.hash(est.password, 10);
    let existente = await knex('users').where({ email: est.email }).first();
    let userId;
    if (!existente) {
      const [id] = await knex('users').insert({
        name: est.name,
        email: est.email,
        password_hash: hash,
        role: 'student'
      });
      userId = id;
    } else {
      userId = existente.id;
    }
    estudanteIds.push(userId);

    if (est.completo) {
      await knex('student_profiles').insert({
        user_id: userId,
        professor_id: profIds[est.professorIdx],
        phone: '1198888000' + (i + 1),
        birth_date: '2000-02-0' + ((i % 3) + 1),
        cep: '0200200' + (i + 1),
        about_me: 'Sou estudante exemplo ' + (i + 1),
        photo_url: 'https://placehold.co/100x100',
        course_name: 'Curso de Demonstração',
        institution: 'Universidade de Exemplo',
        semester: 1 + (i % 3),
        register_number: 'REG00' + (i + 1),
        academic_status: 'active',
        start_date: '2020-01-01',
        end_date: null,
        enrolment_url: 'https://exemplo.com/matricula' + (i + 1),
        profile_completed: true
      });
      estudantesCompletos.push({ id: userId, nome: est.name });
    } else {
      await knex('student_profiles').insert({
        user_id: userId,
        professor_id: profIds[est.professorIdx],
        phone: null,
        birth_date: null,
        cep: null,
        about_me: null,
        photo_url: null,
        course_name: null,
        institution: null,
        semester: null,
        register_number: null,
        academic_status: 'active',
        start_date: null,
        end_date: null,
        enrolment_url: null,
        profile_completed: false
      });
    }
  }

  for (let i = 0; i < estudantesCompletos.length; i++) {
    const estudanteId = estudantesCompletos[i].id;
    const especialidade = 'Psicologia';

    const horarios = [
      { date: '2024-06-10', start_time: '09:00', end_time: '10:00', status: 'available' },
      { date: '2024-06-11', start_time: '14:00', end_time: '15:00', status: 'available' }
    ];

    const slotIds = [];
    for (const horario of horarios) {
      const [slot_id] = await knex('availability').insert({
        student_id: estudanteId,
        date: horario.date,
        start_time: horario.start_time,
        end_time: horario.end_time,
        specialty: especialidade,
        status: horario.status
      });
      slotIds.push(slot_id);
    }

    // Consulta já realizada
    const pacienteRealizada = pacienteIds[(i) % 2]; // alterna entre os dois pacientes completos
    const [slotRealizadaId] = await knex('availability').insert({
      student_id: estudanteId,
      date: '2024-06-01',
      start_time: '10:00',
      end_time: '11:00',
      specialty: especialidade,
      status: 'booked'
    });
    await knex('appointments').insert({
      patient_id: pacienteRealizada,
      student_id: estudanteId,
      slot_id: slotRealizadaId,
      date: '2024-06-01',
      start_time: '10:00',
      end_time: '11:00',
      status: 'completed',
      cancellation_reason: null,
      cancellation_requested_by: null,
      reschedule_requested: false,
      reschedule_requested_by: null,
      meet_link: 'https://meet.exemplo.com/' + estudanteId + '-realizada'
    });

    // Consulta cancelada
    const pacienteCancelada = pacienteIds[(i + 1) % 2];
    const [slotCanceladaId] = await knex('availability').insert({
      student_id: estudanteId,
      date: '2024-05-15',
      start_time: '16:00',
      end_time: '17:00',
      specialty: especialidade,
      status: 'booked'
    });
    await knex('appointments').insert({
      patient_id: pacienteCancelada,
      student_id: estudanteId,
      slot_id: slotCanceladaId,
      date: '2024-05-15',
      start_time: '16:00',
      end_time: '17:00',
      status: 'cancelled',
      cancellation_reason: 'Paciente não pôde comparecer',
      cancellation_requested_by: pacienteCancelada,
      reschedule_requested: false,
      reschedule_requested_by: null,
      meet_link: null
    });
  }

  if (estudantesCompletos.length >= 2) {
    await knex('availability').insert({
      student_id: estudantesCompletos[0].id,
      date: '2025-07-16',
      start_time: '09:45',
      end_time: '10:45',
      specialty: 'Psicologia',
      status: 'available'
    });
    await knex('availability').insert({
      student_id: estudantesCompletos[1].id,
      date: '2025-07-16',
      start_time: '11:00',
      end_time: '12:00',
      specialty: 'Psicologia',
      status: 'available'
    });
  }

  // Admin
  const adminEmail = 'admin@exemplo.com';
  let admin = await knex('users').where({ email: adminEmail }).first();
  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10);
    await knex('users').insert({
      name: 'admin',
      email: adminEmail,
      password_hash: hash,
      role: 'admin'
    });
    console.log('Admin criado.');
  } else {
    console.log('Admin já existe.');
  }

  console.log('Concluído!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});