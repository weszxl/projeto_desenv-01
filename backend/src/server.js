require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const patientProfileRoutes = require('./routes/patientProfileRoutes');
const studentProfileRoutes = require('./routes/studentProfileRoutes');

const availabilityRoutes = require('./routes/availabilityRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// ligação com frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // permitir cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(express.json());
app.use(cookieParser());

// rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/patient', patientProfileRoutes);
app.use('/student', studentProfileRoutes);

app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentRoutes);


// // rota de teste
// app.get('/', (req, res) => {
//   res.send('API de Agendamento');
// });

const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

app.get('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log('refresh Token:', tokens.refresh_token);

    res.send('token recebido. verifique o console do servidor.');
  } catch (error) {
    console.error('erro ao obter token:', error);
    res.status(500).send('erro ao autenticar com o Google');
  }
});

// const bcrypt = require('bcryptjs');
// const knex = require('./config/database');

// (async () => {
//   try {
//     const admin = await knex('users').where({ email: 'admin@exemplo.com' }).first();
//     if (!admin) {
//       const hash = await bcrypt.hash('admin123', 10);
//       await knex('users').insert({
//         name: 'Admin',
//         email: 'admin@exemplo.com',
//         password_hash: hash,
//         role: 'admin',
//         cpf: null
//       });
//       console.log('Usuário admin criado automaticamente!');
//     } else {
//       console.log('Usuário admin já existe. Não será criado novamente.');
//     }
//   } catch (err) {
//     console.error('Erro ao criar admin:', err);
//   }
// })();


const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`o serve ta online | http://localhost:${PORT}`);
  // console.log(`vo durmi`)
});

