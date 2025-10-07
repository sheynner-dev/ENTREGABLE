const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.*, c.name as customer_name 
      FROM sales s 
      LEFT JOIN customers c ON s.customer_id = c.id 
      ORDER BY s.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear venta
router.post('/', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    const { customer_id, items, payment_method, latitude, longitude } = req.body;
    let total = 0;
    
    // Calcular total
    for (const item of items) {
      total += item.price * item.quantity;
    }
    
    // Insertar venta
    const [saleResult] = await connection.query(
      'INSERT INTO sales (customer_id, total, payment_method, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
      [customer_id, total, payment_method, latitude, longitude]
    );
    
    const saleId = saleResult.insertId;
    
    // Insertar items y actualizar stock
    for (const item of items) {
      await connection.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)',
        [saleId, item.product_id, item.quantity, item.price, item.price * item.quantity]
      );
      
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
      
      // Verificar stock después de la venta
      const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [item.product_id]);
      if (product[0].stock <= product[0].min_stock) {
        await connection.query(
          'INSERT INTO stock_alerts (product_id, message) VALUES (?, ?)',
          [item.product_id, `Stock bajo: ${product[0].name} (${product[0].stock} unidades)`]
        );
      }
    }
    
    await connection.commit();
    res.json({ id: saleId, message: 'Venta registrada' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// Obtener detalles de una venta
router.get('/:id', async (req, res) => {
  try {
    const [items] = await db.query(`
      SELECT si.*, p.name as product_name 
      FROM sale_items si 
      JOIN products p ON si.product_id = p.id 
      WHERE si.sale_id = ?
    `, [req.params.id]);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;