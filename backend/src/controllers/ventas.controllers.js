// src/controllers/ventas.controllers.js
import db from "../database/connection.js";

export const guardarVenta = async (req, res) => {
    try {
        const { user, fecha, total, items } = req.body;

        if (!user || !fecha || !total || !items) {
            return res.status(400).json({ err: "Datos incompletos en la venta" });
        }

        // Formatear fecha a YYYY-MM-DD
        const [dia, mes, anio] = fecha.split('/');
        const fechaSQL = `${anio}-${mes}-${dia}`;

        // Insertar venta
        const [ventaResult] = await db.execute(
            "INSERT INTO ventas (user, fecha, total) VALUES (?, ?, ?)",
            [
                user, 
                fechaSQL, 
                total
            ]
        );

        const ventaId = ventaResult.insertId;

        // Insertar cada item en ventas_items
        for (const item of items) {
            const { producto, cantidad } = item;

            await db.execute(
                "INSERT INTO ventas_items (venta_id, producto_id, producto_nombre, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)",
                [
                    ventaId,
                    producto.id,
                    producto.nombre,
                    cantidad,
                    producto.precio
                ]
            );
        }

        return res.status(201).json({ msg: "Venta guardada correctamente", ventaId });

    } catch (err) {
        console.error("Error al guardar la venta:", err);
        return res.status(500).json({ err: "Error interno del servidor" });
    }
};