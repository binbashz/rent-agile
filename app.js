// 1 invocamos a experss       //ORIGINAL
const express = require('express');
const app = express();
const path = require('path');

// 2 seteamos urlencode para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Establece la carpeta 'public' para servir archivos estáticos (como imágenes)
app.use('/public', express.static(path.join(__dirname, 'public')));

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

app.get('/login', (req, res) => {  // ruta para iniciar sesion
    res.render('login');
});

app.get('/registro', (req, res) => {  // ruta registrarse
    res.render('registro');
});

// Ruta para el perfil
app.get('/perfil', (req, res) => {
    if (req.session.loggedin) {
        res.render('perfil', {
            user: req.session.name // Pasa el nombre del usuario autenticado
        });
    } else {
        
        res.redirect('/login'); 
    }
});
// 10 registracion
app.post('/registro', async (req, res) => {
    // obtener los datos del formularios, envia a servidor
    const user = req.body.user;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const birthdate = req.body.birthdate;
    const department = req.body.department;

    const currentDate = new Date();
    const userBirthdate = new Date(birthdate);
    const age = currentDate.getFullYear() - userBirthdate.getFullYear();

     // Validar que las contraseñas coincidan
     if (password !== confirm_password) {
        res.render('registro', {
            alert: true,
            alertTitle: "Registro",
            alertMessage: "Las contraseñas no coinciden",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: ''
        });
        return;
    }
    if (age < 18) {
        res.render('registro', {
            alert: true,
            alertTitle: "Registro",
            alertMessage: "Debes ser mayor de 18 años para registrarte.",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: ''
        });
        return;
    }

    if (!department) {
        res.render('registro', {
            alert: true,
            alertTitle: "Registro",
            alertMessage: "Debes seleccionar un departamento.",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: ''
        });
        return;
    }

    let passwordHash = await bcryptjs.hash(password, 8);
    connection.query('INSERT INTO users SET ?', { user: user, name: name, email: email, password: passwordHash, birthdate: birthdate, department: department }, async (error, results) => {
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
    if (!user || !password) {
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese un usuario y/o contraseña",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'login'
        });
        return; // Salir de la función si no se proporcionaron datos
    }

    let passwordHash = await bcryptjs.hash(password, 8);

    connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
        if (error) {
            console.log(error);
        } else {
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
                req.session.loggedin = true;
                req.session.name = results[0].name;
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
        }
    });
});
// 12 auth pages
app.get('/', (req, res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login: true,
            name: req.session.name
        });
    }else{
        res.render('index',{
            login: false,
            name:'Debe inicar sesion'
        })
    }
})

// 13 logout
app.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

app.listen(3000, (req, res) => {
    console.log('server running in http://localhost:3000/');
});
