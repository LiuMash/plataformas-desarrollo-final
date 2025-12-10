hay que tener installados node y git, pero ya probablimente los tienen

1. Antes de clonar el repositorio, es necesario abrir la terminal en la carpeta donde se desea guardar el proyecto.
   
3. Descargar el proyecto
   
Ejecutar en la terminal:

git clone https://github.com/LiuMash/plataformas-desarrollo-final

cd plataformas-desarrollo-final

Esto creará la carpeta:

plataformas-desarrollo-final/
  backend/
  frontend/
  
4. Instalar y ejecutar el backend (eso va a necesitar Marcus)

cd backend
npm install
node app.js

El backend debe mostrar en la terminal:

Conexión a SQLite establecida.
Tablas verificadas/creadas.
Servidor escuchando en el puerto 3001

La API estará disponible en: http://localhost:3001

Comprobación del backend:

en visual studio code hay que instalar la extesión Thunder Client.

Como usar Thunder CLient:

Pasos básicos:

En la barra lateral izquierda hacer clic en el ícono de Thunder Client. (es un lámpago)

Hacer clic en New Request.

Elegir el método (GET, POST, PUT, DELETE).

Escribir la URL del backend, por ejemplo: http://localhost:3001/products

Para solicitudes POST o PUT:

Abrir la pestaña Body

Seleccionar JSON

Escribir el contenido, por ejemplo:

{
  "name": "Camiseta",
  "description": "Camiseta deportiva",
  "price": 199.99,
  "stock": 5
}

Presionar Send para enviar la solicitud.

Ver la respuesta del servidor en la parte inferior.

5. Instalar y ejecutar el frontend (eso es más para Juan)
   
En otra terminal:

cd frontend
npm install
npm start

El frontend se abrirá en: http://localhost:3000

MARCUS:

Base de datos (SQLite) — lo que ya está hecho

✔ Conexión a SQLite creada

En src/db.js:
initDB() abre database.db
se imprime mensaje de conexión exitosa

✔ Creación automática de tablas implementada

En createTables() ya existen dos tablas:
Tabla users
id              INTEGER (PK)
email           TEXT UNIQUE NOT NULL
password_hash   TEXT NOT NULL
role            TEXT DEFAULT 'user'

Tabla products
id           INTEGER (PK)
name         TEXT NOT NULL
description  TEXT
price        REAL NOT NULL
stock        INTEGER DEFAULT 0

Estas tablas se crean automáticamente si no existen.

✔ Modelos de productos ya implementados completamente

En productModel.js están listos:
getAll() → SELECT
create() → INSERT
update() → UPDATE
remove() → DELETE

API de productos está 100% funcional con SQLite.

las tablas están vacias!

IMPORTANTE COMO SEGUIR CON EL CODIGO

Nadie trabaja directamente en main

Cada participante trabaja siempre en su propia rama.

Cómo crear la rama de trabajo

Cada persona hace esto solo una vez: 

git checkout -b feature/sqlite-models
o
git checkout -b feature/auth-security

esas son sugerencias del chat para persona 2 y prsona 3

Después de hacer cambios:

git add .
git commit -m "Descripción corta del cambio"
git push -u origin feature/sqlite-models / o auth-security

Para Mila:

Hola, ya terminé la parte de Base de Datos, Login, Registro y Seguridad (JWT). Para que funcione en tu parte (app.js y productRoutes.js), sigue estos 4 pasos:

1. Instalación de nuevas librerías
Necesitas instalar las dependencias de seguridad y conexión que agregué. Corre esto en la terminal:

Bash

npm install bcryptjs jsonwebtoken dotenv cors
2. Configuración de Variables de Entorno
En el archivo .env (en la raíz del backend), agrega esta clave secreta para que funcionen los tokens:

Plaintext

JWT_SECRET=clave_secreta_de_los_alumnos
3. Actualizar app.js (Para activar el Login)
En el archivo principal, agrega estas líneas para habilitar CORS (para el frontend) y las rutas de usuarios:

JavaScript

// 1. Importaciones arriba
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');

// 2. Middlewares globales (antes de las rutas)
app.use(cors());
app.use(express.json());

// 3. Conectar la ruta de usuarios
app.use('/users', userRoutes);
4. Proteger las Rutas de Productos (IMPORTANTE)
Para cumplir con la consigna del final, las rutas de Crear, Editar y Borrar productos deben ser privadas (solo Admins).

En tu archivo src/routes/productRoutes.js:

A. Importa los middlewares:

JavaScript

const requireAuth = require('../middlewares/requireAuth');
const requireAdmin = require('../middlewares/requireAdmin');
B. Agrégalos en las rutas sensibles (POST, PUT, DELETE): No los pongas en el GET (ver productos), ese debe ser público.

JavaScript

// Ejemplo de ruta protegida (solo Admins pueden crear)
router.post('/', requireAuth, requireAdmin, productController.create);

// Ejemplo de ruta protegida (solo Admins pueden editar)
router.put('/:id', requireAuth, requireAdmin, productController.update);

// Ejemplo de ruta protegida (solo Admins pueden borrar)
router.delete('/:id', requireAuth, requireAdmin, productController.remove);


