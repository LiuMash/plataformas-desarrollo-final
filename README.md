# INSTRUCCIONES PARA PERSONA 3 (FRONTEND)

## 1. Requisitos

Antes de empezar, es necesario tener instalado:

* Node.js (versión 16 o superior)
* Git

Si ya lo tienen instalado, no es necesario hacer nada más.

---

## 2. Descargar el proyecto

1. Elegir en la computadora una carpeta donde se guardará el proyecto.
2. Abrir la terminal dentro de esa carpeta.
3. Ejecutar:

```
git clone https://github.com/LiuMash/plataformas-desarrollo-final
cd plataformas-desarrollo-final
```

Esto creará:

```
plataformas-desarrollo-final/
   backend/
   frontend/
```

---

## 3. Ejecutar el backend

En una terminal:

```
cd backend
npm install
node app.js
```

Si todo funciona correctamente, la terminal mostrará:

```
Conexión a SQLite establecida.
Tablas verificadas/creadas.
Servidor escuchando en el puerto 3001
```

El backend estará disponible en:
[http://localhost:3001](http://localhost:3001)

---

## 4. Cómo probar el backend con Thunder Client

1. En Visual Studio Code, instalar la extensión Thunder Client.
2. Abrir el icono de Thunder Client en el panel izquierdo.
3. Crear un “New Request”.
4. Elegir el método (GET, POST, PUT, DELETE).
5. Escribir la URL, por ejemplo:

Ver productos:

```
GET http://localhost:3001/products
```

Registrar usuario:

```
POST http://localhost:3001/users/register
```

Login:

```
POST http://localhost:3001/users/login
```

Para POST o PUT:

* Ir a la pestaña Body
* Elegir JSON
* Escribir el contenido, por ejemplo:

```
{
  "name": "Camiseta",
  "price": 199.99,
  "stock": 5
}
```

Para usar un token después de hacer login:
Agregar header:

```
Authorization: Bearer EL_TOKEN_AQUÍ
```

---

## 5. Ejecutar el frontend

En otra terminal:

```
cd frontend
npm install
npm start
```

El frontend abrirá en:
[http://localhost:3000](http://localhost:3000)

---

## 6. Workflow de trabajo en GitHub

Todos trabajan de forma local en su computadora, y suben los cambios directamente a su propia rama.
Nadie trabaja directamente en main.

### Crear tu rama de trabajo (solo una vez)

```
git checkout -b feature/frontend
```

### Guardar tus cambios

```
git add .
git commit -m "Descripción breve del cambio"
git push -u origin feature/frontend
```

### Integración del código

* Cada persona sube su trabajo a su propia rama.
* Mila integrará las ramas manualmente cuando sea necesario, igual que se hizo con el backend.

---

## 7. Estado actual del backend (información útil)

* Base de datos SQLite funcionando.
* Tablas users y products se crean automáticamente (vacías).
* Registro y login funcionando.
* Tokens JWT funcionando.
* Rutas protegidas:

  * POST /products
  * PUT /products/:id
  * DELETE /products/:id
* GET /products es público.
* API lista para conectar con el frontend.

