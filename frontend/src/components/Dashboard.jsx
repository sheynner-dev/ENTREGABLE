import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, sales: 0, customers: 0, lowStock: 0 });
  const [alerts, setAlerts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, salesRes, customersRes, alertsRes] = await Promise.all([
        axios.get(`${API_URL}/products`),
        axios.get(`${API_URL}/sales`),
        axios.get(`${API_URL}/customers`),
        axios.get(`${API_URL}/products/alerts`)
      ]);

      const lowStockCount = productsRes.data.filter(p => p.stock <= p.min_stock).length;

      setStats({
        products: productsRes.data.length,
        sales: salesRes.data.length,
        customers: customersRes.data.length,
        lowStock: lowStockCount
      });

      setAlerts(alertsRes.data);
      setRecentSales(salesRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Productos</h3>
          <p>{stats.products}</p>
        </div>
        <div className="stat-card">
          <h3>Total Ventas</h3>
          <p>{stats.sales}</p>
        </div>
        <div className="stat-card">
          <h3>Total Clientes</h3>
          <p>{stats.customers}</p>
        </div>
        <div className="stat-card" style={{ background: stats.lowStock > 0 ? '#ff4757' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h3>Productos Bajo Stock</h3>
          <p>{stats.lowStock}</p>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="card">
          <h2>🔔 Alertas de Stock</h2>
          {alerts.map(alert => (
            <div key={alert.id} className="alert alert-warning">
              <strong>{alert.product_name}:</strong> {alert.message}
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h2>💰 Últimas Ventas</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.customer_name || 'Sin cliente'}</td>
                  <td>${parseFloat(sale.total).toFixed(2)}</td>
                  <td><span className="badge badge-success">{sale.payment_method}</span></td>
                  <td>{new Date(sale.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;