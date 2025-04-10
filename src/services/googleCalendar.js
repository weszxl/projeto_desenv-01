const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

class GoogleCalendarService {
  static async createMeeting(startTime, endTime) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      const event = {
        summary: 'Consulta Online',
        start: { dateTime: startTime, timeZone: 'UTC' },
        end: { dateTime: endTime, timeZone: 'UTC' },
        conferenceData: {
          createRequest: {
            requestId: 'plataforma-saude-' + Date.now(),
          },
        },
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
      });

      return response.data.hangoutLink;
    } catch (error) {
      console.error('Erro ao criar reunião:', error.message);
      throw error;
    }
  }
}

module.exports = GoogleCalendarService;
