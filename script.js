// Pidima AI Chat Sidebar - Vanilla JS Implementation

const chatToggle = document.getElementById('chat-toggle');
const chatSidebar = document.getElementById('chat-sidebar');
const chatClose = document.getElementById('chat-close');
const themeToggle = document.getElementById('theme-toggle');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const sendBtn = document.getElementById('send-btn');
const attachBtn = document.getElementById('attach-btn');
const fileInput = document.getElementById('file-input');
const filePreview = document.getElementById('file-preview');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');

// --- Theme Toggle ---
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}
// Init theme
setTheme(localStorage.getItem('theme') || 'light');
themeToggle.addEventListener('click', toggleTheme);

// --- Sidebar Open/Close ---
chatToggle.addEventListener('click', () => {
  chatSidebar.classList.add('open');
  chatToggle.style.display = 'none';
  setTimeout(() => messageInput.focus(), 350);
});
chatClose.addEventListener('click', () => {
  chatSidebar.classList.remove('open');
  chatToggle.style.display = 'block';
});

// --- Emoji Picker ---
const EMOJIS = ['😀','😁','😂','🤣','😊','😍','😎','😢','😭','😡','👍','🙏','👏','🎉','🔥','💡','🤖','😇','😉','😅','😜','😬','😱','🥳','🤩','😏','😴','🤔','🙌','💯','🥰','😋','😆','😃','😄','😚','😙','😗','😘','😽','😺','😸','😹','😻','😼','😽','🙀','😿','😾'];
function renderEmojiPicker() {
  emojiPicker.innerHTML = '';
  EMOJIS.forEach(e => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'emoji';
    btn.textContent = e;
    btn.addEventListener('click', () => {
      messageInput.value += e;
      emojiPicker.hidden = true;
      messageInput.focus();
    });
    emojiPicker.appendChild(btn);
  });
}
emojiBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderEmojiPicker();
  emojiPicker.hidden = !emojiPicker.hidden;
});
document.addEventListener('click', (e) => {
  if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
    emojiPicker.hidden = true;
  }
});

// --- File Attachment Preview ---
attachBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  filePreview.innerHTML = '';
  let preview;
  if (file.type.startsWith('image/')) {
    preview = document.createElement('img');
    preview.src = URL.createObjectURL(file);
    preview.alt = file.name;
  } else {
    preview = document.createElement('span');
    preview.textContent = file.name;
  }
  filePreview.appendChild(preview);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-file';
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => {
    fileInput.value = '';
    filePreview.hidden = true;
    filePreview.innerHTML = '';
  });
  filePreview.appendChild(removeBtn);
  filePreview.hidden = false;
});

// --- Message Data & Status Simulation ---
let messages = [];
function addMessage({text, file, from = 'user', status = 'sent', timestamp = Date.now()}) {
  const msg = {text, file, from, status, timestamp, id: Date.now() + Math.random()};
  messages.push(msg);
  renderMessages();
  scrollToBottom();
  return msg;
}
function renderMessages() {
  chatMessages.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.from}`;
    // Message content
    if (msg.file) {
      if (msg.file.type && msg.file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = msg.file.url;
        img.alt = msg.file.name;
        img.style.maxWidth = '120px';
        img.style.borderRadius = '0.5em';
        div.appendChild(img);
      } else {
        const fileLink = document.createElement('a');
        fileLink.href = msg.file.url;
        fileLink.textContent = msg.file.name;
        fileLink.target = '_blank';
        div.appendChild(fileLink);
      }
    }
    if (msg.text) {
      const span = document.createElement('span');
      span.textContent = msg.text;
      div.appendChild(span);
    }
    // Meta (timestamp, status)
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<span>${formatTime(msg.timestamp)}</span>`;
    if (msg.from === 'user') {
      meta.innerHTML += `<span class="status">${statusIcon(msg.status)}</span>`;
    }
    div.appendChild(meta);
    chatMessages.appendChild(div);
  });
}
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}
function statusIcon(status) {
  switch(status) {
    case 'sent': return '🕓';
    case 'delivered': return '✔️';
    case 'read': return '✅';
    default: return '';
  }
}
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// --- Typing Indicator Simulation ---
let typingTimeout;
function showTypingIndicator() {
  typingIndicator.hidden = false;
}
function hideTypingIndicator() {
  typingIndicator.hidden = true;
}
function simulateAITyping() {
  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    // Simulate AI reply
    const aiMsg = addMessage({text: randomAIReply(), from: 'ai', status: 'read', timestamp: Date.now()});
    updateUserMessageStatus();
  }, 1200 + Math.random() * 1200);
}
function randomAIReply() {
  const replies = [
    "Hello! How can I help you today?",
    "That's interesting!",
    "Could you clarify your question?",
    "Here's a quick tip: Try our AI-powered docs!",
    "😊",
    "Let me check that for you.",
    "You can attach files or use emojis!",
    "I'm here to assist you.",
    "Great question!"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// --- Message Status Simulation ---
function updateUserMessageStatus() {
  // Simulate sent -> delivered -> read
  const lastUserMsg = [...messages].reverse().find(m => m.from === 'user');
  if (!lastUserMsg) return;
  setTimeout(() => {
    lastUserMsg.status = 'delivered';
    renderMessages();
    setTimeout(() => {
      lastUserMsg.status = 'read';
      renderMessages();
    }, 800);
  }, 600);
}

// --- Form Submission ---
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text && !fileInput.files[0]) return;
  let file = null;
  if (fileInput.files[0]) {
    const f = fileInput.files[0];
    file = {
      name: f.name,
      type: f.type,
      url: URL.createObjectURL(f)
    };
    fileInput.value = '';
    filePreview.hidden = true;
    filePreview.innerHTML = '';
  }
  const msg = addMessage({text, file, from: 'user', status: 'sent', timestamp: Date.now()});
  messageInput.value = '';
  emojiPicker.hidden = true;
  // Simulate AI typing and reply
  setTimeout(simulateAITyping, 600);
  updateUserMessageStatus();
});

// --- Typing Indicator (user input triggers AI typing) ---
messageInput.addEventListener('input', () => {
  clearTimeout(typingTimeout);
  // Simulate "AI is typing" only if user is typing
  typingTimeout = setTimeout(() => {
    // No-op for now, could be used for real-time typing
  }, 500);
});

// --- Accessibility: ESC to close sidebar ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && chatSidebar.classList.contains('open')) {
    chatSidebar.classList.remove('open');
    chatToggle.style.display = 'block';
  }
});

// --- Initial Render ---
renderMessages();
