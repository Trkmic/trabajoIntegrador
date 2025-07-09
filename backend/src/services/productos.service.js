import productoModel from "../models/productos.model.js";

const getAll = async () => {
    const productos = await productoModel.getAll();
    return productos;
};

const actualizarEstado = async (id, nuevoEstado) => {
    return await productoModel.actualizarEstado(id, nuevoEstado);
};

const actualizarProducto = async (id, datos) => {
    return await productoModel.actualizarProducto(id, datos);
};

export default { getAll, actualizarEstado, actualizarProducto };