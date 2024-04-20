const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const authenticateJWT = require('../middlewares/authentication');
const authorizeRole = require('../middlewares/authorization');

router.post('/', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = new Category({ name, image });
    await category.save();

    res.status(201).send('Categoría creada');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = await Category.findByIdAndUpdate(req.params.id, { name, image }, { new: true });

    if (!category) {
      return res.status(404).send('Categoría no encontrada');
    }

    res.json(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).send('Categoría no encontrada');
    }

    res.send('Categoría eliminada');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
