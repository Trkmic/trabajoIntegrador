import ventasModel from "../models/ventas.model.js";

const mostrarDetalleVentas = async () => {
    const ventas = await ventasModel.getAllVentas();

    //Traer los items para cada venta
    for (const venta of ventas) {
        const items = await ventasModel.getItemsPorVentaId(venta.id);
        venta.items = items;
    }

    return ventas;
}

export default { mostrarDetalleVentas };