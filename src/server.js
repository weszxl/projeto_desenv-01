require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authenticate = require('./middlewares/auth');

const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);


app.use(cors());
app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', authenticate, appointmentRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const availabilityRoutes = require('./routes/availabilityRoutes');
app.use('/api/availability', availabilityRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);






// test routes
app.get('/', (req, res) => {
  res.send('helou moto');
});

// rota para lidar com o callback do Google
app.get('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query; // código de autorização retornado pelo Google

    // código (access_token e refresh_token)
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // salvar o refresh_token em .env
    console.log('Refresh Token:', tokens.refresh_token);

    // redirecione para uma página de sucesso
    res.send('Deu certo! Agora salva o código que retornou no terminal do server.js, e coloca .');
  } catch (error) {
    console.error('Erro no callback:', error);
    res.status(500).send('Erro na autenticação.');
  }
});


// server
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`o serve ta online bora joga mine | http://localhost:${PORT}`);
});

