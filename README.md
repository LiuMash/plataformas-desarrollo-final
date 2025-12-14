## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/LiuMash/plataformas-desarrollo-final.git
cd plataformas-desarrollo-final
```

---

### 2. Ejecutar el backend

```bash
cd backend
npm install
node app.js
```

El servidor se inicia en:

```
http://localhost:3001
```

Las tablas de la base de datos se crean automáticamente al iniciar.

---

### 3. Ejecutar el frontend

Abrir **otro terminal**:

```bash
cd frontend
npm install
npm start
```

La aplicación se abre en:

```
http://localhost:3000
```
### Crear un usuario administrador

Para crear un usuario administrador directamente en la base de datos:

1. Detener el backend si está en ejecución.
2. Abrir un terminal en la carpeta `backend`.
3. Ejecutar el siguiente comando:

```bash
node -e "const sqlite3=require('sqlite3').verbose(); const bcrypt=require('bcryptjs'); const db=new sqlite3.Database('database.db'); const email='admin2@test.com'; const password='admin123'; const hash=bcrypt.hashSync(password,10); db.run('INSERT INTO users (email,password_hash,role) VALUES (?,?,?)',[email,hash,'admin'],function(e){ if(e) console.error(e); else console.log('ADMIN CREADO:',email,'password:',password); db.close();});"
```

4. Iniciar nuevamente el backend:

```bash
node app.js
```

5. Iniciar sesión con:

* Email: `admin2@test.com`
* Contraseña: `admin123`

