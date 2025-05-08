# Projeto de Agendamento

Projeto para agendamento de atendimentos entre pacientes e estudantes.

---

# Instalação

1.  **Clone o repositório**:
   
    ```bash
    git clone https://github.com/weszxl/projeto_desenv-01

    cd projeto_desenv-01/

2.  **Instale as dependências do back / front**:

    cd projeto_desenv-01/backend
    npm install
    npx knex migrate:latest 

    cd projeto_desenv-01/frontend
    npm install

---

# Configure as variáveis de ambiente

1. **crie um arquivo .env em (projeto_desenv-01/backend) com as seguintes variáveis:**

    JWT_SECRET=

    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GOOGLE_REFRESH_TOKEN=
    GOOGLE_REDIRECT_URI=(url_localhost /auth/google/callback)
    
    EMAIL_USER=(testar o envio de emails)
    EMAIL_PASS=(senha de aplicativo gerada pelo google)

2. **crie um arquivo .env em (projeto_desenv-01/frontend) com as seguintes variáveis:**

    VITE_API_URL=(url localhost)

3. **(Opcional para testes da API) Obtenha uma "REFRESH_TOKEN"**:
    
    - Execute: node backend/temp-files/getRefreshToken.js

    - salve a URL gerada no terminal e insira no navegador
    - Faça login com a conta usada para teste
    - REFRESH_TOKEN vai ser exibido no terminal
    - insira o token no campo "GOOGLE_REFRESH_TOKEN=" em /backend/.env

---

# Execução do projeto

    cd projeto_desenv/backend
    npm run dev

    projeto_desenv/frontend
    npm run dev

---

# Rotas backend

    /api/students	            	
    /api/patients	            	
    /api/auth	                	
    /api/appointments	        	
    /api/availability	        	
    /api/admin                  	
    /auth/google/callback       
