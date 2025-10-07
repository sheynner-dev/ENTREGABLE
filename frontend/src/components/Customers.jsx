import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', latitude: '', longitude: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/customers`);
      setCustomers(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await axios.put(`${API_URL}/customers/${editingCustomer.id}`, formData);
      } else {
        await axios.post(`${API_URL}/customers`, formData);
      }
      fetchCustomers();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      try {
        await axios.delete(`${API_URL}/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const openModal = (customer = null) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData(customer);
    } else {
      setEditingCustomer(null);
      setFormData({ name: '', email: '', phone: '', address: '', latitude: '', longitude: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
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
          <h2>👥 Gestión de Clientes</h2>
          <button className="btn-primary" onClick={() => openModal()}>+ Nuevo Cliente</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Coordenadas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.latitude && customer.longitude ? `${customer.latitude}, ${customer.longitude}` : 'N/A'}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => openModal(customer)} style={{ marginRight: '0.5rem' }}>
                      ✏️ Editar
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(customer.id)}>
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
              <h2>{editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} rows="2"></textarea>
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
                {editingCustomer ? 'Actualizar' : 'Crear'} Cliente
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;