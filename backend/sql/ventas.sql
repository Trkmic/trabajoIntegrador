CREATE TABLE ventas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL
); 

CREATE TABLE ventas_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    producto_nombre VARCHAR(150),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);