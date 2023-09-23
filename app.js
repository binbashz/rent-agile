// 1 invocamos a experss
const express = require('express');
const app = express();

// 2 seteamos urlencode para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 3 invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// 4 seteamos el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname +'/public'));

// 5 estalecemos el motor de plantillas ejs 
app.set('view engine', 'ejs');

// 6 invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

// 7 var de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

// 8 invocamos al modulo de conexion db
const connection = require('./database/db');

// estableciendo las rutas 
app.get('/', (req, res)=>{
    res.render('index',{msg:'ESTO ES UN MENSAJE DESDE NODE'});
})

app.get('/login', (req, res)=>{  // ruta para iniciar sesion
    res.render('login');
    })

    app.get('/registro', (req, res)=>{  // ruta registrarse
        res.render('registro');
        })

app.listen(3000, (req, res)=>{
    console.log('server running in http://localhost:3000/');
})
