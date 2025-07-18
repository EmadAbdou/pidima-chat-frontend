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

// --- Facebook-style Emoji Picker Data ---
const EMOJI_CATEGORIES = {
  smileys: ['😀','😁','😂','🤣','😊','😍','😎','😢','😭','😡','😃','😄','😅','😆','😉','😋','😜','😝','😛','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾'],
  animals: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦥','🦦','🦨','🦡','🐁','🐀','🐇','🐿️','🦔'],
  food: ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🥨','🥞','🧇','🧀','🍖','🍗','🥩','🥓','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🥙','🧆','🥚','🍳','🥘','🍲','🥣','🥗','🍿','🧈','🧂','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🍾','🧉','🍽️','🍴','🥄'],
  activities: ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🥅','🏒','🏑','🏏','🥍','🏹','🎣','🤿','🥊','🥋','🎽','🛹','🛷','⛸️','🥌','🛼','🛶','⛵','🚣‍♂️','🚣‍♀️','🧗‍♂️','🧗‍♀️','🏇','⛷️','🏂','🏌️‍♂️','🏌️‍♀️','🏄‍♂️','🏄‍♀️','🏊‍♂️','🏊‍♀️','🤽‍♂️','🤽‍♀️','🚴‍♂️','🚴‍♀️','🚵‍♂️','🚵‍♀️','🤹‍♂️','🤹‍♀️','🧘‍♂️','🧘‍♀️','🎯','🎳','🎮','🎰','🎲','🧩','♟️','🃏','🀄','🎴','🎭','🖼️','🎨','🧵','🧶','👓','🕶️','🥽','🥼','🦺','👔','👕','👖','🧣','🧤','🧥','🧦','👗','👘','🥻','🩱','🩲','🩳','👙','👚','👛','👜','👝','🎒','👞','👟','🥾','🥿','👠','👡','👢','👑','👒','🎩','🎓','🧢','⛑️','📿','💄','💍','💎'],
  travel: ['✈️','🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🚚','🚛','🚜','🛴','🚲','🛵','🏍️','🛺','🚨','🚔','🚍','🚘','🚖','🚡','🚠','🚟','🚃','🚋','🚞','🚝','🚄','🚅','🚈','🚂','🚆','🚇','🚊','🚉','🚁','🚟','🚠','🚡','🛰️','🚀','🛸','🚢','⛴️','🛳️','⛵','🚤','🛥️','🛶','⛽','🚧','🚦','🚥','🚏','🗺️','🗿','🗽','🗼','🏰','🏯','🏟️','🎡','🎢','🎠','⛲','⛱️','🏖️','🏝️','🏜️','🌋','⛰️','🏔️','🗻','🏕️','⛺','🏠','🏡','🏘️','🏚️','🏗️','🏭','🏢','🏬','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏩','💒','🏛️','⛪','🕌','🛕','🕍','🕋','⛩️','🛤️','🛣️','🗾','🎑','🏞️','🌅','🌄','🌠','🎇','🎆','🌇','🌆','🏙️','🌃','🌌','🌉','🌁'],
  objects: ['💡','🔦','🕯️','💸','💵','💴','💶','💷','💰','💳','🧾','💎','⚖️','🔧','🔨','⚒️','🛠️','⛏️','🔩','⚙️','🧰','🧲','🧪','🧫','🧬','🔬','🔭','📡','💻','🖥️','🖨️','⌨️','🖱️','🖲️','💽','💾','💿','📀','📼','📷','📸','📹','🎥','📽️','🎞️','📞','☎️','📟','📠','📺','📻','🎙️','🎚️','🎛️','⏱️','⏲️','⏰','🕰️','⌛','⏳','📡','🔋','🔌','💡','🔦','🕯️','🧯','🛢️','💸','💵','💴','💶','💷','💰','💳','🧾','💎','⚖️','🔧','🔨','⚒️','🛠️','⛏️','🔩','⚙️','🧰','🧲','🧪','🧫','🧬','🔬','🔭','📡'],
  symbols: ['❤️','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','🈯','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🚭','❗','❓','‼️','⁉️','🔅','🔆','〽️','⚠️','🚸','🔱','⚜️','🔰','♻️','✅','🈯','💹','❇️','✳️','❎','🌐','💠','Ⓜ️','🌀','💤','🏧','🚾','♿','🅿️','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','🚻','🚮','🎦','📶','🈁','🔣','ℹ️','🔤','🔡','🔠','🆖','🆗','🆙','🆒','🆕','🆓','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔢','#️⃣','*️⃣','▶️','⏸️','⏯️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','⏸️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','🔼','🔽','⏫','⏬','🛐','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🚭','❗','❓','‼️','⁉️','🔅','🔆','〽️','⚠️','🚸','🔱','⚜️','🔰','♻️','✅','🈯','💹','❇️','✳️','❎','🌐','💠','Ⓜ️','🌀','💤','🏧','🚾','♿','🅿️','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','🚻','🚮','🎦','📶','🈁','🔣','ℹ️','🔤','🔡','🔠','🆖','🆗','🆙','🆒','🆕','🆓','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔢','#️⃣','*️⃣','▶️','⏸️','⏯️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','⏸️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','🔼','🔽','⏫','⏬'],
};
let currentCategory = 'smileys';
let emojiSearchTerm = '';

function renderEmojiGrid() {
  const grid = document.querySelector('.emoji-grid');
  if (!grid) return;
  grid.innerHTML = '';
  let emojis = EMOJI_CATEGORIES[currentCategory] || [];
  if (emojiSearchTerm) {
    emojis = Object.values(EMOJI_CATEGORIES).flat().filter(e => e.includes(emojiSearchTerm));
  }
  if (emojis.length === 0) {
    grid.innerHTML = '<div style="grid-column: span 8; text-align:center; color:var(--msg-status);">No emoji found.</div>';
    return;
  }
  emojis.forEach(e => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'emoji';
    btn.textContent = e;
    btn.addEventListener('click', () => {
      insertAtCursor(messageInput, e);
      document.getElementById('emoji-picker').classList.remove('is-open');
      messageInput.focus();
    });
    grid.appendChild(btn);
  });
}
function insertAtCursor(input, text) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const value = input.value;
  input.value = value.slice(0, start) + text + value.slice(end);
  input.selectionStart = input.selectionEnd = start + text.length;
}
// Render emoji picker with search and categories
function renderEmojiPicker() {
  emojiSearchTerm = '';
  currentCategory = 'smileys';
  document.getElementById('emoji-search').value = '';
  document.querySelectorAll('.emoji-cat').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.emoji-cat[data-cat="smileys"]').classList.add('active');
  renderEmojiGrid();
}
// Ensure emoji picker is hidden by default on chat open
window.addEventListener('DOMContentLoaded', () => {
  const picker = document.getElementById('emoji-picker');
  if (picker) picker.classList.remove('is-open');
  const filePreview = document.getElementById('file-preview');
  if (filePreview) filePreview.classList.remove('has-file');
});

// Toggle emoji picker open/close on emoji button click
emojiBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const picker = document.getElementById('emoji-picker');
  picker.classList.toggle('is-open');
  if (picker.classList.contains('is-open')) {
    renderEmojiPicker();
    document.getElementById('emoji-search').focus();
  }
});
// Hide picker on outside click
// (keep this after the above for correct event order)
document.addEventListener('click', (e) => {
  const picker = document.getElementById('emoji-picker');
  if (!picker.contains(e.target) && e.target !== emojiBtn) {
    picker.classList.remove('is-open');
  }
});

// Only show file preview if a file is selected
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {
    filePreview.classList.remove('has-file');
    filePreview.innerHTML = '';
    return;
  }
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
    filePreview.classList.remove('has-file');
    filePreview.innerHTML = '';
  });
  filePreview.appendChild(removeBtn);
  filePreview.classList.add('has-file');
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
  // Allow sending if there is text OR a file
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
    filePreview.classList.remove('has-file');
    filePreview.innerHTML = '';
  }
  const msg = addMessage({text, file, from: 'user', status: 'sent', timestamp: Date.now()});
  messageInput.value = '';
  emojiPicker.classList.remove('is-open');
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
attachBtn.addEventListener('click', () => fileInput.click());

// Remove 'required' attribute from message input to allow file-only messages
messageInput.removeAttribute('required');
