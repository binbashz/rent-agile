// 1 invocamos a experss
const express = require('express');
const app = express();

// 2 seteamos urlencode para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 3 invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

// 4 seteamos el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// 5 estbalecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

// 6 invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

// 7 var de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// 8 invocamos al modulo de conexion db
const connection = require('./database/db');

// 9 estableciendo las rutas
app.get('/', (req, res) => {
    res.render('index', { msg: 'ESTO ES UN MENSAJE DESDE NODE' });
});

app.get('/login', (req, res) => {  // ruta para iniciar sesion
    res.render('login');
});

app.get('/registro', (req, res) => {  // ruta registrarse
    res.render('registro');
});

// 10 registracion
app.post('/registro', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 8);
    connection.query('INSERT INTO users SET ?', { user: user, name: name, email: email, password: passwordHash }, async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('registro', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro con éxito",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            });
        }
    });
});

// 11 Autenticación
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 8);
    if (user && password) {
        connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
            if (results.length === 0 || !(await bcryptjs.compare(password, results[0].password))) {
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "El nombre de usuario o contraseña son incorrectos",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                req.session.name = results[0].name
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "Inicio de sesión correcto",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });
            }
        });
    }else{
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese un usuario y/o contraseña",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'login'
        });
    }
});

app.listen(3000, (req, res) => {
    console.log('server running in http://localhost:3000/');
});
