const express = require('express');
const router = express.Router();
const Theme = require('../models/Topic');
const authenticateJWT = require('../middlewares/authentication');
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role === role) {
    next();
  } else {
    res.status(403).send(`Se requiere rol de ${role}`);
  }
};

router.post('/', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const { name, allowsImages, allowsVideos, allowsTexts } = req.body;

    const theme = new Theme({ name, allowsImages, allowsVideos, allowsTexts });
    await theme.save();

    res.status(201).send('Temática creada');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const themes = await Theme.find();
    res.json(themes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const { name, allowsImages, allowsVideos, allowsTexts } = req.body;
    const theme = await Theme.findByIdAndUpdate(
      req.params.id,
      { name, allowsImages, allowsVideos, allowsTexts },
      { new: true }
    );

    if (!theme) {
      return res.status(404).send('Temática no encontrada');
    }

    res.json(theme);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);

    if (!theme) {
      return res.status(404).send('Temática no encontrada');
    }

    res.send('Temática eliminada');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
