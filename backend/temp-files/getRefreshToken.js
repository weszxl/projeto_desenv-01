const { google } = require('googleapis');

// Substitua com suas credenciais do Google Cloud Console
const CLIENT_ID = 'adicionar client id do google cloud console aqui';
const CLIENT_SECRET = 'aicionar client secret aqui';
const REDIRECT_URI = 'adicionar redirect uri aqui';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar'
];

// Gere a URL de autenticação
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

console.log('Acesse esta URL e autorize:', authUrl);
