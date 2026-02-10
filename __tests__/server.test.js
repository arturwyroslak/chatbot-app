const { generateReply } = require('../server');

describe('generateReply', () => {
  test('responds to greetings', () => {
    expect(generateReply('Cześć')).toMatch(/Cześć/i);
    expect(generateReply('hej')).toMatch(/Cześć/i);
  });

  test('responds to how are you', () => {
    expect(generateReply('Jak się masz?')).toMatch(/mam się dobrze/i);
  });

  test('responds about weather', () => {
    expect(generateReply('Jaka jest pogoda?')).toMatch(/pogody/i);
  });

  test('handles invalid input', () => {
    expect(generateReply(null)).toMatch(/nie rozumiem/i);
    expect(generateReply(123)).toMatch(/nie rozumiem/i);
  });
});
