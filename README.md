# Sistema de Registro y Autenticación con Express y MySQL

Este proyecto es un sistema de registro y autenticación desarrollado en Node.js utilizando Express y MySQL. Permite a los usuarios registrarse, iniciar sesión y ver su perfil.

### Configuración
Antes de ejecutar la aplicación, asegúrate de haber realizado los siguientes pasos:

Clona el repositorio a tu sistema local.

Crea una base de datos MySQL y configura las credenciales de acceso en el archivo db.js:

```

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
```
Crea un archivo .env en la raíz del proyecto y agrega la información de tu base de datos:

```
DB_HOST=nombre_del_host
DB_USER=nombre_de_usuario
DB_PASSWORD=contraseña_de_usuario
DB_DATABASE=nombre_de_la_base_de_datos
```
## Ejecución
Para iniciar la aplicación, sigue estos pasos:

Abre una terminal en la carpeta del proyecto.

Ejecuta el siguiente comando para instalar las dependencias:

```
npm install
```
Inicia la aplicación con el siguiente comando:

```
npm start
```
La aplicación estará disponible en http://localhost:3000/.

### Características

-**Registro de Usuarios:** Los usuarios pueden registrarse proporcionando un nombre de usuario, nombre completo, correo electrónico y contraseña.

-**Inicio de Sesión:** Los usuarios registrados pueden iniciar sesión con su nombre de usuario y contraseña.

-**Sesión de Usuario:** La aplicación utiliza sesiones de usuario para mantener a los usuarios autenticados.

-**Perfil de Usuario:** Los usuarios autenticados pueden ver su perfil, que muestra su nombre y correo electrónico.

-**Autenticación Segura:** Las contraseñas se almacenan de manera segura utilizando el algoritmo de hash bcrypt.


## Tecnologías Utilizadas
Node.js
Express.js
MySQL
EJS (Motor de Plantillas)
Bcrypt.js (Para Hashing de Contraseñas)
dotenv (Para la Gestión de Variables de Entorno)
SweetAlert2 (Para las Alertas en el Frontend)
Autor
Este proyecto fue desarrollado por Mauricio Ferreira.

aun en construccion

### Autor
Este proyecto fue desarrollado por Mauricio Ferreira, bajo el nombre de Rent Agile.

(aun en construccion 😛)

  ![model](https://github.com/binbashz/NEW-API-CAR-USER/assets/124454895/24696462-9c03-4490-b0ff-a63b3448eb05)
