const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 
const multer = require('multer');

// Configura el almacenamiento y las opciones de 'multer'
const storage = multer.diskStorage({
    destination: 'public/uploads/', // Directorio donde se guardarán los archivos
    filename: (req, file, callback) => {
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        callback(null, uniqueFileName); // Utiliza UUID para generar un nombre único para el archivo
    }
});

const upload = multer({ storage: storage });

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

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/registro', (req, res) => {
    res.render('registro');
});

// Ruta para el perfil
app.get('/perfil', (req, res) => {
    if (req.session.loggedin) {
        res.render('perfil', {
            user: req.session.name
        });
    } else {
        res.redirect('/login');
    }
});

app.post('/registro', async (req, res) => {
    // Obtener los datos del formulario enviado al servidor
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

app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    if (!user || !password) {
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese un usuario y/o contraseña",
            alertIcon: "warning",
            showConfirmButton: false,
            showLoginButton: true,
            showRegisterButton: true,
            timer: false,
            ruta: 'login'
        });
        return;
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
                    showConfirmButton: false,
                    showLoginButton: true,
                    showRegisterButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                req.session.loggedin = true;
                req.session.name = results[0].name;
                req.session.userId = results[0].id;
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "Inicio de sesión correcto",
                    alertIcon: "success",
                    showConfirmButton: false,
                    showLoginButton: false,
                    showRegisterButton: false,
                    timer: 1500,
                    ruta: '/'
                });
            }
        }
    });
});

app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión'
        });
    }
});

app.post('/publicar-auto', upload.single('Foto'), async (req, res) => {
    if (!req.session.loggedin) {
        res.render('publicar-auto', {
            alert: true,
            alertTitle: "Inicie Sesión",
            alertMessage: "Debes iniciar sesión para publicar un auto.",
            alertIcon: 'info',
            showConfirmButton: false,
            showLoginButton: true,
            showRegisterButton: true,
            timer: false,
            ruta: 'login'
        });
        return;
    }

    // Obtener datos del formulario
    const marca = req.body.Marca;
    const modelo = req.body.Modelo;
    const matricula = req.body.Matricula;
    const usuario = req.body.Usuario;
    const telefono = req.body.Telefono;
    const accion = req.body.Accion;
    const seguro = req.body.Seguro;
    const descripcion = req.body.Descripcion;
    
    // Utiliza req.file.filename para obtener el nombre único de la imagen subida
    const foto = req.file.filename;

    connection.query('INSERT INTO autos (marca, modelo, matricula, usuario, telefono, accion, seguro, descripcion, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [marca, modelo, matricula, usuario, telefono, accion, seguro, descripcion, foto],
        (error, results) => {
            if (error) {
                console.log(error);
                res.render('publicar-auto', {
                    alert: true,
                    alertTitle: "Error en la Publicación",
                    alertMessage: "Ha ocurrido un error al publicar el auto. Por favor, inténtalo de nuevo más tarde.",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: ''
                });
            } else {
                res.render('publicar-auto', {
                    alert: true,
                    alertTitle: "Publicación Exitosa",
                    alertMessage: "El auto se ha publicado correctamente",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });
            }
        });
});

app.get('/publicar-auto', (req, res) => {
    res.render('publicar-auto'); 
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.listen(3000, (req, res) => {
    console.log('server running in http://localhost:3000/');
});
