//Archivo React Principal de la Aplicacións

import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Products from './Products';
import Sales from './Sales';
import Customers from './Customers';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="app">
      <nav className="navbar">
        <h1>📦 Sistema de Inventario</h1>
        <div className="nav-buttons">
          <button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? 'active' : ''}>
            📊 Dashboard
          </button>
          <button onClick={() => setActiveView('products')} className={activeView === 'products' ? 'active' : ''}>
            📦 Productos
          </button>
          <button onClick={() => setActiveView('sales')} className={activeView === 'sales' ? 'active' : ''}>
            💰 Ventas
          </button>
          <button onClick={() => setActiveView('customers')} className={activeView === 'customers' ? 'active' : ''}>
            👥 Clientes
          </button>
        </div>
      </nav>

      {/* Rutas del React principal */}
      <main className="content">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'products' && <Products />}
        {activeView === 'sales' && <Sales />}
        {activeView === 'customers' && <Customers />}
      </main>
    </div>
  );
}

export default App;