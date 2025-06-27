import productoModel from "../models/productos.model.js";

const getAll = async () => {
    const productos = await productoModel.getAll();
    return productos;
};

export default { getAll };