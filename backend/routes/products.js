const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear producto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, min_stock, latitude, longitude } = req.body;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock, min_stock, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, min_stock, latitude, longitude]
    );
    
    // Verificar alerta de stock
    if (stock <= min_stock) {
      await db.query(
        'INSERT INTO stock_alerts (product_id, message) VALUES (?, ?)',
        [result.insertId, `Stock bajo: ${name} (${stock} unidades)`]
      );
    }
    
    res.json({ id: result.insertId, message: 'Producto creado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, stock, min_stock, latitude, longitude } = req.body;
    await db.query(
      'UPDATE products SET name=?, description=?, price=?, stock=?, min_stock=?, latitude=?, longitude=? WHERE id=?',
      [name, description, price, stock, min_stock, latitude, longitude, req.params.id]
    );
    
    // Verificar alerta de stock
    if (stock <= min_stock) {
      await db.query(
        'INSERT INTO stock_alerts (product_id, message) VALUES (?, ?)',
        [req.params.id, `Stock bajo: ${name} (${stock} unidades)`]
      );
    }
    
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener alertas de stock
router.get('/alerts', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT sa.*, p.name as product_name 
      FROM stock_alerts sa 
      JOIN products p ON sa.product_id = p.id 
      WHERE sa.is_read = FALSE 
      ORDER BY sa.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;