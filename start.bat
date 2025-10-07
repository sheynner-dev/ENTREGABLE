@echo off
echo ===== Iniciando Sistema de Inventario =====

echo 1. Verificando que MySQL esté en funcionamiento...
net start MySQL80 2>nul
if %errorlevel% neq 0 (
    echo MySQL no está iniciado o no existe el servicio MySQL80.
    echo Asegúrate de que XAMPP esté en ejecución con MySQL activo.
    pause
    exit /b
)

echo 2. Verificando que la base de datos exista...
cd c:\xampp\mysql\bin
mysql -u root -e "CREATE DATABASE IF NOT EXISTS inventory_system;"
mysql -u root inventory_system < c:\xampp\htdocs\SitioInventario\frontend\database\schema.sql

echo 3. Iniciando el servidor backend...
start cmd /k "cd c:\xampp\htdocs\SitioInventario\backend && npm install && npm start"

echo 4. Iniciando el frontend...
start cmd /k "cd c:\xampp\htdocs\SitioInventario\frontend && npm install && npm start"

echo ===== Sistema iniciado correctamente =====
echo Accede a la aplicación en: http://localhost:3000
echo El backend está corriendo en: http://localhost:5000
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul