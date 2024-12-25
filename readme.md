<div align="center">

#  StreamerPay

<img src="/images/spay.png" alt="StreamerPay Logo" />

### 💸 A moderna plataforma de doações para streamers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>

---

## 📋 Índice

- [Sobre](#-sobre)
- [Tecnologias](#-tecnologias)
- [Recursos](#-recursos)
- [Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API](#-api)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

## 🎯 Sobre

StreamerPay é uma plataforma moderna de doações para streamers que facilita o recebimento de contribuições dos fãs através de diversos métodos de pagamento. Com uma interface intuitiva e sistema de notificações em tempo real, o StreamerPay torna simples e seguro o processo de monetização para criadores de conteúdo.

## 💻 Tecnologias

Este projeto é construído com as seguintes tecnologias:

- **Frontend**:
  - React + Next.js
  - Tailwind CSS
  - Shadcn/UI
  - Lucide Icons

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication

- **Integrações de Pagamento**:
  - PIX
  - Nubank
  - PicPay

## ✨ Recursos

- 🔒 Autenticação segura para streamers
- 💳 Múltiplos métodos de pagamento
- 🔔 Notificações em tempo real
- 📊 Dashboard de análise de doações
- 💰 Sistema de pagamento automático
- 📱 Design responsivo
- 🌐 Suporte a múltiplos idiomas
- 🛡️ Proteção contra fraudes

## 🚀 Começando

### Pré-requisitos

- Node.js 18.0 ou superior
- MongoDB
- NPM ou Yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/bulletdev/streamerPay.git
```

2. Instale as dependências
```bash
cd streamerPay
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
MONGODB_URI=sua_uri_mongodb

# JWT
JWT_SECRET=seu_jwt_secret

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Integrações de Pagamento (se aplicável)
PIX_KEY=sua_chave_pix
NUBANK_TOKEN=seu_token_nubank
PICPAY_TOKEN=seu_token_picpay
```

## 📱 Uso

### Para Streamers

1. Crie uma conta na plataforma
2. Configure seus métodos de pagamento
3. Compartilhe seu link de doação com seus seguidores
4. Acompanhe as doações no dashboard

### Para Doadores

1. Acesse o link de doação do streamer
2. Escolha o valor e método de pagamento
3. Adicione uma mensagem (opcional)
4. Complete o pagamento

## 📚 API

### Endpoints

```markdown
POST /api/auth/register     - Registro de streamer
POST /api/auth/login        - Login de streamer
POST /api/payments/create   - Criar nova doação
GET  /api/payments/history  - Histórico de doações
POST /api/webhooks/:service - Webhooks de pagamento
```

## 🚢 Deploy

### Deploy no Vercel

1. Fork este repositório
2. Crie uma nova aplicação no Vercel
3. Conecte com seu repositório
4. Configure as variáveis de ambiente
5. Deploy!

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Seu Nome - [@bulletdev](https://twitter.com/craquebullet) - contato@michaelbullet.com

Link do Projeto: [https://github.com/Bulletdev/streamerPay](https://github.com/bulletdev/streamerPaay)

---

<div align="center">

### 🌟 Feito com ♥ para a comunidade de streamers

</div>
