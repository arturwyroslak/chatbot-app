const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple rule-based chatbot logic
function generateReply(message) {
  if (!message || typeof message !== 'string') {
    return "Przepraszam, nie rozumiem.";
  }

  const normalized = message.trim().toLowerCase();

  if (normalized.includes('cześć') || normalized.includes('czesc') || normalized.includes('hej')) {
    return 'Cześć! Jak mogę pomóc?';
  }

  if (normalized.includes('jak') && normalized.includes('masz')) {
    return 'Dziękuję, mam się dobrze!';
  }

  if (normalized.includes('pogoda')) {
    return 'Nie mam dostępu do pogody, ale możesz sprawdzić lokalne serwisy pogodowe.';
  }

  // Fallback
  return "Przykro mi, nie rozumiem. Możesz zapytać o pogodę lub napisać 'cześć'.";
}

module.exports = { generateReply };

app.post('/api/message', (req, res) => {
  try {
    const { message } = req.body;
    if (typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid payload: message must be a string' });
    }
    const reply = generateReply(message);
    return res.json({ reply });
  } catch (err) {
    console.error('Error handling /api/message', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
  console.log(`Chatbot app listening at http://localhost:${port}`);
});
