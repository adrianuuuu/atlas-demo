
// ============================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================

function getNow() {
    return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function getTodayLabel() {
    return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function showToast(msg, duration = 3500) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), duration);
}

function formatWABold(text) {
    // converte *texto* em <span class="wa-bold">texto</span>
    return text.replace(/\*([^*\n]+)\*/g, '<span class="wa-bold">$1</span>');
}

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}


// ============================================================
// RENDER MESSAGE
// ============================================================

function renderMessage(role, text, time) {
    const area = document.getElementById('messages-area');
    const wrap = document.createElement('div');
    wrap.className = `msg-wrap ${role === 'user' ? 'out' : 'in'}`;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = formatWABold(text);

    const meta = document.createElement('div');
    meta.className = 'msg-meta';
    meta.innerHTML = `${time}${role === 'user' ? '<span class="ticks">✓✓</span>' : ''}`;

    wrap.appendChild(bubble);
    wrap.appendChild(meta);
    area.appendChild(wrap);
    area.scrollTop = area.scrollHeight;

    // update sidebar
    const preview = text.length > 40 ? text.substring(0, 40) + '…' : text;
    document.getElementById('sidebar-preview').textContent = (role === 'user' ? 'Você: ' : '') + preview.replace(/\n/g, ' ');
    document.getElementById('sidebar-time').textContent = time;
}

function showTyping() {
    const area = document.getElementById('messages-area');
    const wrap = document.createElement('div');
    wrap.className = 'typing-wrap';
    wrap.id = 'typing-indicator';
    wrap.innerHTML = `<div class="typing-bubble">
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  </div>`;
    area.appendChild(wrap);
    area.scrollTop = area.scrollHeight;

    document.getElementById('atlas-status').textContent = 'digitando...';
    document.getElementById('atlas-status').className = 'chat-header-status';
}

function hideTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
    document.getElementById('atlas-status').textContent = 'online';
    document.getElementById('atlas-status').className = 'chat-header-status online';
}

// ============================================================
// SEND MESSAGE
// ============================================================

async function sendMessage() {
    if (STATE.isTyping) return;

    const input = document.getElementById('msg-input');
    const text = input.value.trim();
    if (!text) return;

    // hide hint
    document.getElementById('hint-bubble').classList.add('hidden');

    input.value = '';
    input.style.height = 'auto';

    const time = getNow();
    renderMessage('user', text, time);

    STATE.messages.push({ role: 'user', content: text });

    STATE.isTyping = true;
    document.getElementById('send-btn').disabled = true;
    showTyping();

    try {
        const nextChamado = STATE.chamadoCounter + 1;
        const contextNote = `[CONTEXTO DA DEMO: Próximo número de chamado fictício disponível: 2026${String(nextChamado).padStart(2, '0')}. Se você abrir um chamado nesta mensagem, use esse número. Não mencione este contexto ao usuário.]`;
        const messageWithContext = text + '\n\n' + contextNote;

        const response = await fetch(N8N_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: messageWithContext,
                sessionId: STATE.sessionId
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const reply = data.output || data.reply || '';

        hideTyping();

        if (!reply) throw new Error('Resposta vazia');

        // detecta se chamado foi aberto (heurística simples)
        const chamadoAberto = reply.includes('202601') || reply.includes('202602') ||
            reply.includes('202603') || reply.includes('202604') || reply.includes('202605') ||
            /2026\d{2}/.test(reply) || reply.toLowerCase().includes('chamado aberto') ||
            reply.toLowerCase().includes('chamado está aberto');

        if (chamadoAberto) {
            STATE.chamadoCounter++;
        }

        const replyTime = getNow();
        STATE.messages.push({ role: 'assistant', content: reply });
        renderMessage('assistant', reply, replyTime);

    } catch (err) {
        hideTyping();
        console.error(err);

        let friendlyMsg = 'Erro ao conectar com o ATLAS. Verifique sua conexão.';
        if (err.message?.includes('401') || err.message?.toLowerCase().includes('auth')) {
            friendlyMsg = 'Chave de API inválida ou ausente.';
        } else if (err.message?.includes('429')) {
            friendlyMsg = 'Muitas requisições. Aguarde um momento e tente novamente.';
        } else if (err.message?.includes('529') || err.message?.toLowerCase().includes('overloaded')) {
            friendlyMsg = 'API temporariamente sobrecarregada. Tente novamente em instantes.';
        }

        showToast(friendlyMsg);
        STATE.messages.pop(); // remove a mensagem do usuário que falhou
    }

    STATE.isTyping = false;
    document.getElementById('send-btn').disabled = false;
    document.getElementById('msg-input').focus();
}

// ============================================================
// WHATSAPP MOBILE — abrir/fechar chat
// ============================================================
function openMobileChat() {
    if (window.innerWidth > 768) return;
    const chat = document.querySelector('.wa-chat');
    if (chat) chat.classList.add('mobile-active');
}

function closeMobileChat() {
    const chat = document.querySelector('.wa-chat');
    if (chat) chat.classList.remove('mobile-active');
}

// Clique no chat-item abre o chat no mobile
document.querySelector('.chat-item')?.addEventListener('click', () => {
    openMobileChat();
});