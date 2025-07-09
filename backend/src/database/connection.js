import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda', 
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a MySQL');
    }
});

export default db;