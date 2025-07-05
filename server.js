import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy/groups', async (req, res) => {
  try {
    const response = await fetch('https://www.miet.ru/schedule/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.get('/proxy/data', async (req, res) => {
  try {
    const group = req.query.group; // Получаем параметр группы
    if (!group) {
      return res.status(400).json({ error: 'Не указана группа' });
    }

    const response = await fetch(
      `https://www.miet.ru/schedule/data?group=${encodeURIComponent(group)}`,
      {
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://www.miet.ru/'
        }
      }
    );

    // Проверяем, что сервер действительно вернул JSON
    const contentType = response.headers.get('content-type');
    const text = await response.text();

    if (!contentType || !contentType.includes('application/json')) {
      return res.status(500).json({ error: 'Сервер вернул не JSON', response: text });
    }

    res.json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера', details: error.message });
  }
});

app.listen(5000, () => console.log('Сервер запущен на порту 5000'));
