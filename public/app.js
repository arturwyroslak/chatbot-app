(function(){
  const messagesEl = document.getElementById('messages');
  const inputEl = document.getElementById('input');
  const sendBtn = document.getElementById('send');

  function appendMessage(text, className){
    const div = document.createElement('div');
    div.className = 'message ' + (className || '');
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage(){
    const text = inputEl.value;
    if (!text) return;
    appendMessage(text, 'user');
    inputEl.value = '';
    try{
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (!res.ok) {
        appendMessage('Błąd serwera', 'bot');
        return;
      }
      const data = await res.json();
      appendMessage(data.reply, 'bot');
    }catch(err){
      appendMessage('Błąd połączenia', 'bot');
      console.error(err);
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
})();
