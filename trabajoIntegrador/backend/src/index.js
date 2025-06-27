import express from 'express'
import path from 'path';
import {fileURLToPath} from 'url';
import productosRoutes from './routes/productos.route.js';


//settings
const app = express()
app.set('PORT', 5000)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// middlewares
app.use(express.json())
const rootDir = path.join(__dirname, '../../frontend');
app.use(express.static(rootDir));

app.use('/productos', productosRoutes);
app.use("/assets", express.static(path.join(__dirname, "../assets")));

//routes
app.get('/',(req,res)=>{
    res.status(200).sendFile("cliente/html/bienvenida.html", {root: rootDir});
})
app.get('/main',(req,res)=>{
    res.status(200).sendFile("cliente/html/main.html", {root: rootDir});
})
app.get('/ticket',(req,res)=>{
    res.status(200).sendFile("cliente/html/ticket.html", {root: rootDir});
})

//listeners
app.listen(app.get("PORT"),()=>{
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
})
