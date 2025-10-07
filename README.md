# Sistema de Inventario

**Entregable del Curso de Fullstack Developer Software**

## Desarrollado por:
- DIOSES CÓRDOVA
- GODOS ZAPATA
- ZAVALA QUEREVALÚ
- SOLANO CAMPOS
- SALDARRIAGA MEJIAS

## Descripción del Proyecto

Este sistema de inventario es una aplicación web completa que permite gestionar productos, ventas y clientes. Desarrollada con una arquitectura moderna de frontend en React y backend en Node.js con Express, ofrece una interfaz intuitiva para el control de inventario.

## Estructura del Proyecto

```
SitioInventario/
├── backend/                # Servidor API REST
│   ├── config/             # Configuración de la base de datos
│   ├── routes/             # Rutas de la API
│   ├── package.json        # Dependencias del backend
│   └── server.js           # Punto de entrada del servidor
├── frontend/               # Aplicación React
│   ├── database/           # Esquema SQL de la base de datos
│   ├── public/             # Archivos públicos
│   ├── src/                # Código fuente React
│   │   ├── components/     # Componentes de la aplicación
│   │   └── index.js        # Punto de entrada de React
│   └── package.json        # Dependencias del frontend
└── start.bat               # Script para iniciar la aplicación
```

## Requisitos Previos

- Node.js (v22.14.0 o superior)
- XAMPP (para MySQL)
- NPM (10.9.2 o superior)

## Instalación

### 1. Configuración de la Base de Datos

1. Inicie XAMPP y active los servicios de Apache y MySQL
2. La base de datos se creará automáticamente al ejecutar el script de inicio

### 2. Instalación del Backend

```bash
cd backend
npm install
```

Dependencias principales:
- express: Framework para crear el servidor API
- mysql2: Cliente MySQL para Node.js
- cors: Middleware para habilitar CORS

### 3. Instalación del Frontend

```bash
cd frontend
npm install
```

Dependencias principales:
- react: Biblioteca para construir interfaces de usuario
- react-dom: Renderizado de React en el navegador
- react-scripts: Scripts y configuración para aplicaciones React

## Ejecución del Proyecto

### Método 1: Script Automático

Ejecute el archivo `start.bat` en la raíz del proyecto para iniciar automáticamente:
- Verificación de MySQL
- Creación de la base de datos
- Importación del esquema SQL
- Inicio del servidor backend
- Inicio del servidor frontend

### Método 2: Ejecución Manual

1. Inicie el servidor backend:
```bash
cd backend
npm start
```

2. Inicie el frontend:
```bash
cd frontend
npm start
```

## Estructura de la Base de Datos

La base de datos `inventory_system` contiene las siguientes tablas:

- **products**: Almacena información de productos (nombre, descripción, precio, stock)
- **customers**: Información de clientes
- **sales**: Registro de ventas
- **stock_alerts**: Alertas automáticas cuando el stock es bajo

## Componentes Principales

### Backend

- **server.js**: Configura el servidor Express, middleware y rutas
- **database.js**: Establece la conexión con MySQL
- **routes/products.js**: Gestiona operaciones CRUD para productos
- **routes/sales.js**: Maneja el registro y consulta de ventas
- **routes/customers.js**: Administra información de clientes

### Frontend

- **App.jsx**: Componente principal que gestiona la navegación
- **Dashboard.jsx**: Panel de control con resumen de datos
- **Products.jsx**: Gestión de productos (agregar, editar, eliminar)
- **Sales.jsx**: Registro y visualización de ventas
- **Customers.jsx**: Administración de clientes

## Funcionalidades

1. **Gestión de Productos**
   - Agregar, editar y eliminar productos
   - Control de stock con alertas automáticas
   - Visualización de ubicación geográfica

2. **Gestión de Ventas**
   - Registro de nuevas ventas
   - Historial de ventas
   - Estadísticas de ventas

3. **Gestión de Clientes**
   - Registro de clientes
   - Historial de compras por cliente

4. **Dashboard**
   - Resumen de inventario
   - Alertas de stock bajo
   - Estadísticas de ventas

## Acceso a la Aplicación

- Frontend: http://localhost:3000
- API Backend: http://localhost:5000

## Rutas de la API

- **GET /api/products**: Obtener todos los productos
- **POST /api/products**: Crear nuevo producto
- **PUT /api/products/:id**: Actualizar producto
- **DELETE /api/products/:id**: Eliminar producto

- **GET /api/sales**: Obtener todas las ventas
- **POST /api/sales**: Registrar nueva venta

- **GET /api/customers**: Obtener todos los clientes
- **POST /api/customers**: Registrar nuevo cliente
- **PUT /api/customers/:id**: Actualizar cliente

## Solución de Problemas

1. **Error de conexión a la base de datos**
   - Verifique que XAMPP esté en ejecución
   - Compruebe las credenciales en `backend/config/database.js`

2. **Error al iniciar el frontend**
   - Verifique que todas las dependencias estén instaladas
   - Compruebe que el archivo `index.js` exista en la carpeta `src`

3. **Error al iniciar el backend**
   - Verifique que el puerto 5000 esté disponible
   - Compruebe la conexión a la base de datos

## Contribuciones

Este proyecto fue desarrollado como entregable del curso de Fullstack Developer Software por el equipo mencionado anteriormente.