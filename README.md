
🧠 O que é o ATLAS?

O ATLAS é um sistema completo de gestão de chamados de TI com um diferencial: o usuário abre e acompanha chamados diretamente pelo WhatsApp, sem precisar acessar nenhum sistema. Um agente de IA coleta os dados, identifica o tipo do problema e registra o chamado automaticamente — enquanto os técnicos gerenciam tudo por um painel web moderno.

Desenvolvido do zero e em uso real na Secretaria de Infraestrutura do Estado do Ceará (SEINFRA).


✨ Funcionalidades
📱 Canal WhatsApp (Usuário Final)

Abertura de chamados via conversa natural com o agente de IA (ATLAS)
Coleta inteligente de dados: nome, departamento, problema, tombamento do equipamento
Classificação automática do tipo de chamado (Hardware, Software, Rede, Impressora etc.)
Notificações em tempo real: chamado aberto → em andamento → concluído
Memória de sessão: o agente lembra o usuário em contatos subsequentes

🖥️ Painel Web (Técnicos & Admins)

Dashboard com métricas em tempo real (chamados por status, tipo, técnico)
Listagem, filtragem e gerenciamento completo de chamados
Atribuição de chamados a técnicos, registro de anotações e histórico
Inventário de equipamentos com ficha técnica, histórico e arquivos
Gestão de usuários com controle de acesso por nível (admin / técnico)
Arquivamento de chamados e equipamentos

🤖 O Agente ATLAS

O agente de IA é orquestrado via n8n com memória persistente em PostgreSQL. Ele:

Recebe mensagens do WhatsApp via Evolution API
Identifica o usuário e recupera contexto de conversas anteriores
Conduz o slot-filling para coleta de dados do chamado
Classifica automaticamente o tipo (Hardware, Software, Rede, Impressora, Periférico)
Chama a API REST para abrir o chamado no sistema
Monitora eventos (chamado em andamento, anotações, finalização) e notifica o usuário em tempo real
