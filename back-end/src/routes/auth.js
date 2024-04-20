const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authenticateJWT = require('../middlewares/authentication');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!['admin', 'lector', 'creador'].includes(role)) {
      return res.status(400).send('Rol no válido');
    }

    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).send('Usuario registrado');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password, email} = req.body;
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send('Contraseña incorrecta');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get('/check',authenticateJWT ,async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token no proporcionado o incorrecto' });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); 
    if(user){
      res.json({
        isValid: true,
        user: {
          id: req.user.id,
          username: req.user.username,
          role: req.user.role,
        },
      });
    } else {
      res.json({ isValid: false });
    }
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
