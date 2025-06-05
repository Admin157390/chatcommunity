const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

const userDisplay = document.getElementById('userDisplay');
const logoutBtn = document.getElementById('logoutBtn');

const messagesList = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

let username = null;
let messages = [];

messageInput.disabled = true;
messageForm.querySelector('button').disabled = true;

function validateUsername() {
  const val = usernameInput.value.trim();
  if (val.length < 2) {
    loginError.textContent = 'Username must be at least 2 characters';
    loginBtn.disabled = true;
  } else {
    loginError.textContent = '';
    loginBtn.disabled = false;
  }
}

usernameInput.addEventListener('input', validateUsername);

function doLogin() {
  const name = usernameInput.value.trim();
  if (name.length < 2) {
    loginError.textContent = 'Username must be at least 2 characters';
    return;
  }
  username = name;
  userDisplay.textContent = `Logged in as: ${username}`;
  loginScreen.classList.remove('active');
  loginScreen.classList.add('hidden');
  chatScreen.classList.remove('hidden');
  chatScreen.classList.add('active');
  messageInput.disabled = false;
  messageForm.querySelector('button').disabled = false;
  messageInput.focus();
  loginError.textContent = '';
}

loginBtn.addEventListener('click', doLogin);

usernameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !loginBtn.disabled) {
    e.preventDefault();
    doLogin();
  }
});

logoutBtn.addEventListener('click', () => {
  username = null;
  messages = [];
  messagesList.innerHTML = '';
  usernameInput.value = '';
  messageInput.disabled = true;
  messageForm.querySelector('button').disabled = true;
  loginScreen.classList.remove('hidden');
  loginScreen.classList.add('active');
  chatScreen.classList.remove('active');
  chatScreen.classList.add('hidden');
  loginError.textContent = '';
  loginBtn.disabled = true;
  usernameInput.focus();
});

function addMessageToUI(msg) {
  const li = document.createElement('li');
  li.classList.toggle('self', msg.username === username);

  const usernameSpan = document.createElement('span');
  usernameSpan.classList.add('username');
  usernameSpan.textContent = msg.username;

  const textNode = document.createTextNode(msg.text);

  const timeSpan = document.createElement('span');
  timeSpan.classList.add('time');
  const time = new Date(msg.timestamp);
  timeSpan.textContent = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  li.appendChild(usernameSpan);
  li.appendChild(textNode);
  li.appendChild(timeSpan);

  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!username) {
    alert('Please login first!');
    return;
  }
  const text = messageInput.value.trim();
  if (!text) return;

  const msgObj = {
    username,
    text,
    timestamp: Date.now(),
  };

  messages.push(msgObj);
  addMessageToUI(msgObj);
  messageInput.value = '';
});
