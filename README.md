<div align="center">

# 🤖 ATLAS
### Assistente de Tecnologia, Lógica e Atendimento de Suporte

**Sistema de suporte de TI com IA integrada ao WhatsApp — desenvolvido e implantado em produção na SEINFRA/CE**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

---

## 🧠 O que é o ATLAS?

O ATLAS é um sistema completo de gestão de chamados de TI com um diferencial: o usuário abre e acompanha chamados **diretamente pelo WhatsApp**, sem precisar acessar nenhum sistema. Um agente de IA coleta os dados, identifica o tipo do problema e registra o chamado automaticamente — enquanto os técnicos gerenciam tudo por um painel web moderno.

> Desenvolvido do zero e **em uso real** na Secretaria de Infraestrutura do Estado do Ceará (SEINFRA).

---

## ✨ Funcionalidades

### 📱 Canal WhatsApp (Usuário Final)
- Abertura de chamados via conversa natural com o agente de IA (ATLAS)
- Coleta inteligente de dados: nome, departamento, problema, tombamento do equipamento
- Classificação automática do tipo de chamado (Hardware, Software, Rede, Impressora etc.)
- Notificações em tempo real: chamado aberto → em andamento → concluído
- Memória de sessão: o agente lembra o usuário em contatos subsequentes

### 🖥️ Painel Web (Técnicos & Admins)
- Dashboard com métricas em tempo real (chamados por status, tipo, técnico)
- Listagem, filtragem e gerenciamento completo de chamados
- Atribuição de chamados a técnicos, registro de anotações e histórico
- Inventário de equipamentos com ficha técnica, histórico e arquivos
- Gestão de usuários com controle de acesso por nível (admin / técnico)
- Arquivamento de chamados e equipamentos

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                     USUÁRIO FINAL                       │
│                    (via WhatsApp)                       │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              EVOLUTION API (WhatsApp Gateway)           │
└─────────────────────┬───────────────────────────────────┘
                      │  Webhook
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   n8n (Orquestração)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │ OpenRouter│  │MemóriaPG │  │  Tools (API calls)   │  │
│  │(Gemini 2.5│  │(Sessões) │  │  Abrir chamado       │  │
│  │  Flash)  │  │          │  │  Buscar equipamento   │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │  REST API
                      ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                │
│              Knex.js + PostgreSQL                       │
│              JWT Auth · Multer · Bcrypt                 │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (Vanilla HTML/CSS/JS)             │
│              Tailwind CSS · SPA com hash routing        │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
|---|---|
| **Backend** | Node.js, Express, Knex.js, PostgreSQL, JWT, Bcrypt, Multer |
| **Frontend** | HTML, CSS, JavaScript (Vanilla), Tailwind CSS |
| **IA & Automação** | n8n, OpenRouter (Gemini 2.5 Flash), Evolution API |
| **Infraestrutura** | Render (backend), n8n Cloud (self-hosted) |
| **Banco de Dados** | PostgreSQL (produção), SQLite (desenvolvimento) |

## 🤖 O Agente ATLAS

O agente de IA é orquestrado via **n8n** com memória persistente em PostgreSQL. Ele:

1. Recebe mensagens do WhatsApp via Evolution API
2. Identifica o usuário e recupera contexto de conversas anteriores
3. Conduz o slot-filling para coleta de dados do chamado
4. Classifica automaticamente o tipo (Hardware, Software, Rede, Impressora, Periférico)
5. Chama a API REST para abrir o chamado no sistema
6. Monitora eventos (chamado em andamento, anotações, finalização) e notifica o usuário em tempo real

---

## 👨‍💻 Autor

Desenvolvido por **Adriano Mesquita**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/adriano-mesquita-da-silva-b30151209)
---

<div align="center">
<sub>Sistema em produção desde 2025 · SEINFRA — Secretaria de Infraestrutura do Estado do Ceará</sub>
</div>
