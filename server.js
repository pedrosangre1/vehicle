// Зареждаме необходимите модули
const express = require('express'); // Express framework за създаване на уеб сървъри
const bodyParser = require('body-parser'); // Middleware за парсване на тялото на HTTP заявките
const { Pool } = require('pg'); // Модул за свързване към PostgreSQL база данни
const bcrypt = require('bcrypt'); // Модул за хеширане на пароли
const path = require('path'); // Модул за работа с файлови и пътни имена

// Инициализираме express приложението
const app = express();
const port = 3000; // Портът, на който сървърът ще слуша

// Конфигурираме връзката към PostgreSQL базата данни
const pool = new Pool({
  user: 'postgres',         // Потребителско име за базата данни
  host: 'localhost',        // Хост на базата данни
  database: 'testDB',       // Име на базата данни
  password: '102501',       // Парола за базата данни
  port: 5432,               // Портът, на който работи PostgreSQL
});

// Използваме body-parser middleware за парсване на JSON данни в тялото на заявките
app.use(bodyParser.json());
// Сервираме статични файлове от директорията 'public'
app.use(express.static('public'));

// Обработваме POST заявка за добавяне на потребител
app.post('/addUser', async (req, res) => {
  const { name, email, password } = req.body; // Извличаме данните от тялото на заявката
  console.log('Received /addUser request with data:', req.body); // Логваме данните
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Хешираме паролата с bcrypt
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword] // Вмъкваме нов потребител в базата данни и връщаме новия запис
    );
    console.log('User added successfully:', result.rows[0]); // Логваме новия потребител
    res.status(200).json(result.rows[0]); // Връщаме новия потребител като JSON отговор
  } catch (err) {
    console.error('Error adding user:', err); // Логваме грешката в конзолата
    res.status(500).json({ error: 'Database error' }); // Връщаме грешка 500 (Internal Server Error)
  }
});

// Обработваме POST заявка за вход на потребител
app.post('/login', async (req, res) => {
  const { email, password } = req.body; // Извличаме данните от тялото на заявката
  console.log('Received /login request with data:', req.body); // Логваме данните
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]); // Търсим потребител по имейл
    if (result.rows.length === 0) {
      console.log('User not found with email:', email); // Логваме ако потребителят не е намерен
      return res.status(400).json({ error: 'User not found' }); // Ако потребителят не е намерен, връщаме грешка
    }
    const user = result.rows[0]; // Вземаме намерения потребител
    console.log('User found:', user); // Логваме намерения потребител
    const isMatch = await bcrypt.compare(password, user.password); // Сравняваме въведената парола с хешираната парола в базата данни
    if (!isMatch) {
      console.log('Incorrect password for user:', email); // Логваме ако паролата не съвпада
      return res.status(400).json({ error: 'Incorrect password' }); // Ако паролата не съвпада, връщаме грешка
    }
    console.log('User logged in successfully:', user); // Логваме успешен вход
    res.status(200).json({ name: user.name }); // Ако всичко е наред, връщаме името на потребителя
  } catch (err) {
    console.error('Error logging in:', err); // Логваме грешката в конзолата
    res.status(500).json({ error: 'Database error' }); // Връщаме грешка 500 (Internal Server Error)
  }
});

// Обработваме POST заявка за добавяне на автомобил
app.post('/addCar', async (req, res) => {
  const { brand, model, type, axles, reg_number, fuel } = req.body; // Извличаме данните от тялото на заявката
  console.log('Received /addCar request with data:', req.body); // Логваме данните
  try {
    const result = await pool.query(
      'INSERT INTO cars (brand, model, type, axles, registration_number, fuel_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [brand, model, type, axles, reg_number, fuel] // Вмъкваме нов автомобил в базата данни и връщаме новия запис
    );
    console.log('Car added successfully:', result.rows[0]); // Логваме новия автомобил
    res.status(200).json(result.rows[0]); // Връщаме новия автомобил като JSON отговор
  } catch (err) {
    console.error('Error adding car:', err); // Логваме грешката в конзолата
    res.status(500).json({ error: 'Database error' }); // Връщаме грешка 500 (Internal Server Error)
  }
});


// Слушаме на зададения порт и изписваме съобщение в конзолата
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
