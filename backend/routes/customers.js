const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear cliente
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, latitude, longitude } = req.body;
    const [result] = await db.query(
      'INSERT INTO customers (name, email, phone, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, latitude, longitude]
    );
    res.json({ id: result.insertId, message: 'Cliente creado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, address, latitude, longitude } = req.body;
    await db.query(
      'UPDATE customers SET name=?, email=?, phone=?, address=?, latitude=?, longitude=? WHERE id=?',
      [name, email, phone, address, latitude, longitude, req.params.id]
    );
    res.json({ message: 'Cliente actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM customers WHERE id=?', [req.params.id]);
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;