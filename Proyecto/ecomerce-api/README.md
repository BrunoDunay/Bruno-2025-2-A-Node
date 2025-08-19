# 🛒 E-commerce API – Proyecto Integrador

API RESTful para la gestión de un sistema de e-commerce.  
Incluye autenticación con **JWT**, roles de usuario (**admin/cliente**), validaciones, relaciones entre modelos y endpoints públicos y protegidos.

---

## 📂 Estructura del proyecto
```bash
ecomerce-api/
├── .env
├── server.js
├── package.json
├── logs
├── src/
│   ├── config/            # Configuración de base de datos
│   ├── controllers/       # Lógica de negocio
│   ├── models/            # Modelos de Mongoose
│   ├── routes/            # Definición de endpoints
│   ├── middlewares/       # Middlewares (auth, validaciones, errores)
```

⚙️ Instalación y configuración
1. Clonar el repositorio

git clone https://github.com/usuario/ecomerce-api.git
cd ecomerce-api

2. Instalar dependencias

npm install

3. Configurar variables de entorno en .env

PORT=4000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=clave_secreta_segura

4. Iniciar el servidor
npm run dev

El servidor corre en http://localhost:3000

🧩 Modelos principales

Usuario → nombre, email, contraseña (bcrypt), rol (admin | cliente)

Producto → nombre, descripción, precio, categoría

Categoría → nombre, descripción

Carrito → usuario, lista de productos con cantidad

Orden → usuario, productos, estado, dirección de envío, método de pago

Otros → direcciones, reseñas, notificaciones, wishlist

🔑 Autenticación y roles

Registro y login generan un JWT válido.

Endpoints protegidos requieren token en Headers:
    Authorization: Bearer <token>

Rol admin → CRUD de productos, listar usuarios

Rol cliente → ver productos, gestionar carrito, crear órdenes

🚀 Endpoints principales
🔓 Públicos

POST /auth/register → Crear cuenta

POST /auth/login → Iniciar sesión

GET /products → Listar productos (paginación: ?page=1&limit=10)

GET /categories → Listar categorías

🔐 Protegidos (requiere JWT)

POST /products (admin) → Crear producto

PUT /products/:id (admin) → Actualizar producto

DELETE /products/:id (admin) → Eliminar producto

GET /users (admin) → Listar usuarios (con paginación)

POST /cart → Agregar producto al carrito

PUT /cart/:id → Actualizar cantidad

DELETE /cart/:id → Eliminar producto del carrito

POST /orders → Crear orden

GET /orders → Listar órdenes del usuario autenticado

🛡️ Validaciones y seguridad

Uso de express-validator en endpoints clave (registro, productos, órdenes)

Contraseñas encriptadas con bcrypt

Manejo centralizado de errores con middlewares de error

Tokens JWT con expiración y validación de roles

📊 Relaciones

Producto ↔ Categoría → cada producto pertenece a una categoría

Usuario ↔ Carrito → cada carrito pertenece a un usuario

Usuario ↔ Orden → cada orden pertenece a un usuario

Orden ↔ Productos → cada orden incluye múltiples productos

📌 Notas finales

Proyecto desarrollado en Node.js + Express + MongoDB

JWT y roles implementados

Paginación en productos y usuarios

Validaciones y middlewares centralizados

Código organizado en capas (MVC)