# Projeto de Agendamento

Projeto para agendamento de atendimentos entre pacientes e estudantes.

---

## Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/weszxl/projeto_desenv-01
cd projeto_desenv-01/
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

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_REDIRECT_URI=url_localhost/auth/google/callback

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
/api/students
/api/patients
/api/auth
/api/appointments
/api/availability
/api/admin
/auth/google/callback
```
