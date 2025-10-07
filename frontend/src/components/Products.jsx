import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', min_stock: 10, latitude: '', longitude: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/products/${editingProduct.id}`, formData);
      } else {
        await axios.post(`${API_URL}/products`, formData);
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', stock: '', min_stock: 10, latitude: '', longitude: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', stock: '', min_stock: 10, latitude: '', longitude: '' });
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
          <h2>📦 Gestión de Productos</h2>
          <button className="btn-primary" onClick={() => openModal()}>+ Nuevo Producto</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Stock Mínimo</th>
                <th>Estado</th>
                <th>Coordenadas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${parseFloat(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.min_stock}</td>
                  <td>
                    {product.stock <= product.min_stock ? (
                      <span className="badge badge-danger">Bajo Stock</span>
                    ) : product.stock <= product.min_stock * 2 ? (
                      <span className="badge badge-warning">Stock Medio</span>
                    ) : (
                      <span className="badge badge-success">Stock OK</span>
                    )}
                  </td>
                  <td>{product.latitude && product.longitude ? `${product.latitude}, ${product.longitude}` : 'N/A'}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => openModal(product)} style={{ marginRight: '0.5rem' }}>
                      ✏️ Editar
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(product.id)}>
                      🗑️ Eliminar
                    </button>
                  </td>
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
              <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Precio ($)</label>
                  <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Stock Mínimo</label>
                  <input type="number" value={formData.min_stock} onChange={(e) => setFormData({...formData, min_stock: e.target.value})} required />
                </div>
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
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                {editingProduct ? 'Actualizar' : 'Crear'} Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;