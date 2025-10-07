import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: '', payment_method: 'cash', latitude: '', longitude: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [salesRes, productsRes, customersRes] = await Promise.all([
        axios.get(`${API_URL}/sales`),
        axios.get(`${API_URL}/products`),
        axios.get(`${API_URL}/customers`)
      ]);
      setSales(salesRes.data);
      setProducts(productsRes.data);
      setCustomers(customersRes.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.product_id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.product_id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { product_id: product.id, name: product.name, price: product.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.product_id === productId ? { ...item, quantity: parseInt(quantity) } : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Agregue productos al carrito');
      return;
    }

    try {
      await axios.post(`${API_URL}/sales`, {
        customer_id: formData.customer_id || null,
        items: cart,
        payment_method: formData.payment_method,
        latitude: formData.latitude || null,
        longitude: formData.longitude || null
      });
      
      fetchData();
      closeModal();
      alert('Venta registrada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar la venta');
    }
  };

  const openModal = () => {
    setCart([]);
    setFormData({ customer_id: '', payment_method: 'cash', latitude: '', longitude: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCart([]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
        }
      );
    }
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>💰 Registro de Ventas</h2>
          <button className="btn-primary" onClick={openModal}>+ Nueva Venta</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Coordenadas</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.customer_name || 'Sin cliente'}</td>
                  <td>${parseFloat(sale.total).toFixed(2)}</td>
                  <td><span className="badge badge-success">{sale.payment_method}</span></td>
                  <td>{sale.latitude && sale.longitude ? `${sale.latitude}, ${sale.longitude}` : 'N/A'}</td>
                  <td>{new Date(sale.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Nueva Venta</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>

            <div className="form-group">
              <label>Cliente (Opcional)</label>
              <select value={formData.customer_id} onChange={(e) => setFormData({...formData, customer_id: e.target.value})}>
                <option value="">Sin cliente</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Método de Pago</label>
              <select value={formData.payment_method} onChange={(e) => setFormData({...formData, payment_method: e.target.value})}>
                <option value="cash">Efectivo</option>
                <option value="card">Tarjeta</option>
                <option value="transfer">Transferencia</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Latitud</label>
                <input type="text" value={formData.latitude} onChange={(e) => setFormData({...formData, latitude: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Longitud</label>
                <input type="text" value={formData.longitude} onChange={(e) => setFormData({...formData, longitude: e.target.value})} />
              </div>
            </div>
            <button type="button" className="btn-secondary" onClick={getLocation} style={{ marginBottom: '1rem' }}>
              📍 Obtener Ubicación Actual
            </button>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Seleccionar Productos</h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '0.5rem' }}>
              {products.filter(p => p.stock > 0).map(product => (
                <div key={product.id} style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{product.name}</strong> - ${parseFloat(product.price).toFixed(2)}
                    <br /><small>Stock: {product.stock}</small>
                  </div>
                  <button className="btn-secondary" onClick={() => addToCart(product)}>+ Agregar</button>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Carrito</h3>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999' }}>El carrito está vacío</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.product_id} style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{item.name}</strong> - ${parseFloat(item.price).toFixed(2)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.product_id, e.target.value)}
                        style={{ width: '60px', padding: '0.3rem' }}
                        min="1"
                      />
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                      <button className="btn-danger" onClick={() => removeFromCart(item.product_id)}>✕</button>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Total: ${calculateTotal().toFixed(2)}
                </div>
              </>
            )}

            <button onClick={handleSubmit} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Registrar Venta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sales;