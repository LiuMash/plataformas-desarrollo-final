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


