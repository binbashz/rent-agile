
# Aplicación de Publicación de Automóviles

Esta es una aplicación web que permite a los usuarios iniciar sesión, completar un formulario para publicar información sobre un automóvil y ver su perfil. La aplicación está desarrollada en Node.js utilizando el framework Express.js y se comunica con una base de datos MySQL para almacenar y recuperar los datos de los automóviles y los usuarios.

## Requisitos

Antes de ejecutar esta aplicación, asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/): Asegúrate de tener Node.js instalado en tu sistema.
- [MySQL](https://www.mysql.com/): Necesitas una base de datos MySQL para almacenar los datos de los usuarios y los automóviles.
- [Express.js](https://expressjs.com/): Este proyecto utiliza Express.js como el framework web para Node.js.
- [Multer](https://www.npmjs.com/package/multer): Se utiliza Multer para la gestión de archivos, en este caso, para cargar imágenes de automóviles.
- [Express-session](https://www.npmjs.com/package/express-session): Express-session se emplea para el manejo de sesiones de usuario.

## Configuración

1. Clona este repositorio en tu máquina local.

2. Crea una base de datos MySQL y configura las credenciales de acceso en el archivo `app.js`:

```javascript
const connection = mysql.createConnection({
  host: 'tu_host',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos'
});
```

3. Instala las dependencias necesarias usando npm:

```
npm install express express-session multer mysql
```

4. Inicia la aplicación:

```
node app.js
```

La aplicación se ejecutará en `http://localhost:3000/`.

## Funcionalidades

### Inicio de Sesión

- Los usuarios pueden iniciar sesión con sus credenciales. Si no están autenticados, serán redirigidos a la página de inicio de sesión.

### Publicación de Automóviles

- Los usuarios autenticados pueden completar un formulario para publicar detalles sobre un automóvil. Esto incluye la marca, el modelo y otros campos relacionados con el automóvil.
- Los datos del formulario se validan antes de la publicación para garantizar que la información sea correcta y completa.
- Las imágenes del automóvil se pueden cargar junto con la publicación.

### Perfil del Usuario

- Los usuarios autenticados pueden ver su perfil, que incluye su nombre y dirección de correo electrónico.
- También pueden editar su información personal si lo desean.

### Cierre de Sesión

- Los usuarios pueden cerrar sesión en cualquier momento para salir de su cuenta.

### Manejo de Errores

- La aplicación maneja los errores de manera básica y muestra una página de error personalizada en `error.html` en caso de un error interno del servidor.

## Notas

- Este es un ejemplo básico de una aplicación web. Para su uso en producción, se recomienda mejorar la seguridad, implementar autenticación más robusta.

## Servidor y Framework

Esta aplicación utiliza Node.js como entorno de servidor y Express.js como framework web. Node.js es una plataforma de tiempo de ejecución de JavaScript que permite la creación de aplicaciones web del lado del servidor. Express.js, por otro lado, es un marco web minimalista para Node.js que facilita la creación de rutas, manejo de solicitudes y respuestas, y la configuración de middleware.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
```

En este código, creamos una instancia de Express y configuramos el servidor para escuchar en el puerto 3000.

## Endpoints

Los endpoints son rutas específicas en la aplicación a las que los clientes pueden enviar solicitudes HTTP. En este código, se definen varios endpoints utilizando el método `.get()` o `.post()` de Express. Por ejemplo:

```javascript
app.get('/perfil', (req, res) => {
  // ...
});

app.post('/publicar-auto', (req, res) => {
  // ...
});

app.get('/', (req, res) => {
  // ...
});
```

- `/perfil`: Este endpoint se utiliza para mostrar el perfil del usuario una vez que ha iniciado sesión. Dependiendo de si el usuario está autenticado o no, se renderiza una página diferente.

- `/publicar-auto`: Aquí, los usuarios pueden enviar un formulario para publicar información sobre un automóvil. Se utiliza el método POST para manejar los datos enviados desde el formulario. Antes de insertar los datos en la base de datos, se realizan validaciones.

- `/`: Esta es la ruta raíz de la aplicación. Dependiendo de si el usuario ha iniciado sesión, se renderiza una página diferente.

## Base de Datos

Esta aplicación utiliza una base de datos MySQL para almacenar datos de usuarios y automóviles. La conexión a la base de datos se configura en el archivo `app.js`, se crea en db.js y se utiliza el módulo `mysql` para interactuar con la base de datos.

```javascript
const connection = mysql.createConnection({
  host: 'tu_host',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos'
});
```

## Manejo de Sesiones

La aplicación utiliza el middleware `express-session` para gestionar las sesiones de usuario. Esto permite mantener el estado de inicio de sesión y almacenar datos de sesión, como el nombre de usuario y el correo electrónico.

```javascript
app.use(session({
  secret: 'tu_secreto',
  resave: true,
  saveUninitialized: true
}));
```

## Middleware

Express.js permite el uso de middleware para realizar tareas como el manejo de sesiones, validación de datos, y el manejo de archivos. En este código, se usa `multer` como middleware para gestionar la carga de imágenes de automóviles.

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
```

## Manejo de Errores

La aplicación maneja los errores de manera básica y muestra una página de error personalizada en `error.html` en caso de un error interno del servidor. También se utiliza el middleware de manejo de errores de Express para registrar errores en la consola.

```
app.use((err, req, res
, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'public', 'error.html'));
});
```


```
1. **Middleware Express.js**: La aplicación hace un uso extensivo de middlewares de Express.js para gestionar solicitudes HTTP, garantizando un flujo de datos seguro y eficiente.

2. **Conexión a Base de Datos Segura**: La configuración de la conexión a la base de datos MySQL se ha implementado de manera segura, utilizando parámetros externos para proteger contra posibles ataques de inyección SQL.

3. **Validación de Datos del Formulario**: Se realizan comprobaciones exhaustivas de validación antes de insertar datos en la base de datos, asegurando que la información ingresada sea precisa y segura.

4. **Seguridad de Sesiones**: La gestión de sesiones de usuario se lleva a cabo de forma segura, utilizando un secreto único y técnicas de almacenamiento seguro para proteger la integridad de las sesiones.

5. **Arquitectura MVC**: La aplicación sigue una arquitectura Modelo-Vista-Controlador (MVC), dividiendo de manera organizada la lógica de la aplicación en modelos (para la lógica de datos), vistas (para la presentación) y controladores (para el flujo de control).

6. **Control de Acceso**: La implementación de controles de acceso garantiza que solo los usuarios autenticados puedan acceder a áreas específicas de la aplicación, mejorando la seguridad.

```
Estos son algunos de los aspectos más importantes de la ingeniería de esta aplicación web.


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
