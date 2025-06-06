# Projeto de Agendamento

Projeto para agendamento de atendimentos entre pacientes e estudantes.

---

## 📁 Estrutura Geral

- `backend/` - API Node.js com SQLite
- `frontend/` - Aplicação React
- `knex.js` para migrations
- `nodemailer` - para envio de e-mails
- `googleapis` - para integração com o Google Calendar

---

## Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/weszxl/projeto_desenv-01
cd projeto_desenv-01/

git checkout -b <nome-da-branch> # criar nova branch para merge
```

2. **Instale as dependências do backend e frontend**:
```bash
cd projeto_desenv-01/backend
npm install
npx knex migrate:latest 
```

```bash
cd projeto_desenv-01/frontend
npm install
```

---

## Configure as variáveis de ambiente

1. **Crie um arquivo `.env` em `projeto_desenv-01/backend` com as seguintes variáveis:**
```env
JWT_SECRET=

# Google Calendar
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_REDIRECT_URI=url_localhost/auth/google/callback

# Email (ex: Gmail com senha de app)
EMAIL_USER= # e-mail para envio
EMAIL_PASS= # senha de aplicativo
```

2. **Crie um arquivo `.env` em `projeto_desenv-01/frontend` com as seguintes variáveis:**
```env
VITE_API_URL=url_localhost
```

3. **(Opcional para testes da API) Obtenha uma "REFRESH_TOKEN"**:
```bash
node backend/temp-files/getRefreshToken.js
```
- Copie a URL exibida no terminal e abra no navegador.
- Faça login com a conta Google usada para testes.
- O terminal exibirá o `refresh_token`.
- Insira o token no campo `GOOGLE_REFRESH_TOKEN=` no arquivo `/backend/.env`.

---

## Execução do projeto

### Backend
```bash
cd projeto_desenv-01/backend
npm run dev
```

### Frontend
```bash
cd projeto_desenv-01/frontend
npm run dev
```

---

## Rotas disponíveis

```http
POST /auth/login - login para users
GET /auth/google/callback - integração Google OAuth

POST /users/register/patient - cadastro de pacientes
POST /users/register/student - cadastro de estudantes (admin)

POST /api/availability - nova disponibilidade (student)
GET /api/availability/student/:studentId - horários disponíveis

POST /api/appointments - criar agendamento (patient)
GET /api/appointments - listar agendamentos do paciente
```
