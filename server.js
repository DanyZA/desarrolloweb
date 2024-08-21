const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { constants } = require('buffer');
const { Console } = require('console');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'danyzapata.a@gmail.com', // Cambia esto a tu correo electrónico
    pass: 'vffl enya btvd dcvl', // Cambia esto a tu contraseña o contraseña de aplicación
  },
});

// Configuración de la base de datos
const db = mysql.createConnection({ 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'loginapp',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

// Endpoint para registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hash],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        res.status(201).json({ message: 'User registered' });
      }
    );
  });
});

// Endpoint para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

// Endpoint para solicitar restablecimiento de contraseña
app.post('/forgot-password', async (req, res) => {

  const { email } = req.body;




  // Generar un token único para el restablecimiento de contraseña
  const token = jwt.sign({ correo: email }, 'your_jwt_secret', { expiresIn: '1h' });

  try {
    db.query('SELECT * FROM users WHERE username = ?', [email], (err, results) => {
      const user = results[0];

      if (user) {
        console.log('existe usuario')
        const mailOptions = {
          from: 'danyzapata.a@gmail.com', // Cambia esto a tu correo electrónico
          to: email,
          subject: 'Recuperación de',
          text: `Ingresa este token: ${token} para recuperar tu contraseña`, // URL de tu aplicación
        };

        // Enviar el correo
        transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        const tokencorreo = jwt.decode(token)
        console.log(tokencorreo);

        // Guardar el token en la base de datos
        db.query(
          'INSERT INTO password_resets (email, token, expires) VALUES (?, ?, ?)',
          [email, token, Date.now() + 3600000], // Token válido por 1 hora
          (err, result) => {
            if (err) {
              return res.status(500).json({ error: err });
            }

            res.status(200).send({ message: 'Enlace de recuperación enviado' });
          }
        );

      } else {
        res.status(400).send({ message: 'Verifica el correo ingresado' });
      }
    })
    // Configuración del correo

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send({ message: 'Error al enviar el correo' });
  }
});

// Endpoint para restablecer la contraseña
app.post('/reset-password', (req, res) => {
  const { newToken, newPassword } = req.body;

  try {
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      const decode = jwt.decode(newToken)
      const email = decode.correo
      // Actualizar la contraseña en la base de datos
      db.query('SELECT * FROM users WHERE username = ?', [email], (err, result) => {
        console.log(result)
      });
      db.query('UPDATE users SET password = ?',[hash],(err,result)=>{
        res.status(200).send({ message: 'Contraseña actualizada' });
      });
    });
  } catch {
    res.status(500).send({ message: 'Error al actualizar contraseña' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
