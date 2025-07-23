// script.js
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Screenshot protection
document.addEventListener("keydown", e => {
  if (e.key === "PrintScreen") {
    e.preventDefault();
    alert("Screenshot is disabled.");
  }
});
document.addEventListener("keyup", e => {
  if (e.key === "PrintScreen") navigator.clipboard.writeText("");
});

// Ably real-time chat
const ably = new Ably.Realtime('6mdNpg.fkFuvA:_N8cFFZsxjNar_9-RTHU3_HxiUOQfDx6RTxgU5fhva0');
const channel = ably.channels.get('community-chat');

function sendMessage() {
  const user = document.getElementById("username").value.trim();
  const text = document.getElementById("message").value.trim();
  if (!user || !text) return;
  channel.publish("chat", { user, text });
  document.getElementById("message").value = "";
}

channel.subscribe("chat", msg => {
  const el = document.createElement("p");
  el.innerHTML = `<strong>${msg.data.user}:</strong> ${msg.data.text}`;
  const box = document.getElementById("chat-box");
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
});
