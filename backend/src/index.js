//Imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productosRoutes from './routes/productos.route.js';
import ventasRoutes from './routes/ventas.route.js';

//Settings
const app = express();
app.set('PORT', 5000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middlewares
app.use(express.json());

// Rutas absolutas a carpetas
const rootDir = path.join(__dirname, '../../frontend');          
const clienteDir = path.join(rootDir, 'cliente');                 
const adminDir = path.join(rootDir, 'admin');    
const cssDir = path.join(rootDir, 'css');       
const staticDir = path.join(rootDir, 'static');
const jsDir = path.join(rootDir, 'js');

//Archivos estáticos (CSS, JS)
app.use('/cliente', express.static(clienteDir));
app.use('/admin', express.static(adminDir));
app.use('/css', express.static(cssDir));
app.use('/js', express.static(jsDir));

//Ruta para imagenes que no sean de productos
app.use('/static', express.static(staticDir));

//Ruta para imagenes de productos
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//API que trae productos (BDD)
app.use('/productos', productosRoutes);

//API que alamcena ventas (BDD)
app.use('/ventas', ventasRoutes);


//Routes lado CLIENTE
app.get('/', (req, res) => {
    res.status(200).sendFile('cliente/html/bienvenida.html', { root: rootDir });
});

app.get('/catalogo', (req, res) => {
    res.status(200).sendFile('cliente/html/main.html', { root: rootDir });
});

app.get('/ticket', (req, res) => {
    res.status(200).sendFile('cliente/html/ticket.html', { root: rootDir });
});

app.get('/carrito', (req, res) => {
    res.status(200).sendFile('cliente/html/carrito.html', { root: rootDir });
});

//Routes lado ADMIN
app.get('/login', (req, res) => {
    res.status(200).sendFile('admin/html/login.html', { root: rootDir });
});

app.get('/dashboard', (req, res) => {
    res.status(200).sendFile('admin/html/dashboard.html', { root: rootDir });
});

app.get('/altaProducto', (req, res) => {
    res.status(200).sendFile('admin/html/altaProducto.html', { root: rootDir });
});

app.get('/editarProducto', (req, res) => {
    res.status(200).sendFile('admin/html/editarProducto.html', { root: rootDir });
})

//Listener
app.listen(app.get("PORT"), ()=> {
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
