import productoService from "../services/productos.service.js";

const getAllProductos = async (req, res) => {
    try {
        const productos = await productoService.getAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

export default { getAllProductos };