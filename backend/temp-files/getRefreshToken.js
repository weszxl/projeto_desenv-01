const { google } = require('googleapis');

// Substitua com suas credenciais do Google Cloud Console
const CLIENT_ID = '237873110313-qheajct2ukh61ru2sbr7n1hd98psjr38.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3050/auth/google/callback';

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
