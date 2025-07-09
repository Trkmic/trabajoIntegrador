import productoModel from "../models/productos.model.js";

const getAll = async () => {
    const productos = await productoModel.getAll();
    return productos;
};

const actualizarEstado = async (id, nuevoEstado) => {
    return await productoModel.actualizarEstado(id, nuevoEstado);
};


export default { getAll, actualizarEstado };