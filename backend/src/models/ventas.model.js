import db from '../database/connection.js';

const getAllVentas = async () => {
    const [ventas] = await db.execute('SELECT * FROM ventas ORDER BY fecha DESC');
    return ventas;
};

const getItemsPorVentaId = async (ventaId) => {
    const [items] = await db.execute(`
        SELECT vi.*, p.img
        FROM ventas_items vi
        JOIN productos p ON vi.producto_id = p.id
        WHERE vi.venta_id = ?
        `, [ventaId]);
        return items;
};

export default { getAllVentas, getItemsPorVentaId };