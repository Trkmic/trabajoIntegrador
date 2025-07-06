import productoService from "../services/productos.service.js";

const getAllProductos = async (req, res) => {
    try {
        const productos = await productoService.getAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

const cambiarEstadoProducto = async (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;

    if (typeof activo !== "boolean") {
        return res.status(400).json({ error: "El campo 'activo' debe ser booleano" });
    }

    try {
        const productoActualizado = await productoService.actualizarEstado(id, activo);

        if (!productoActualizado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({
            mensaje: `Producto ${activo ? "activado" : "desactivado"} correctamente`,
            producto: productoActualizado
        });
    } catch (error) {
        console.error("Error al cambiar estado del producto:", error);
        res.status(500).json({ error: "Error al actualizar el estado del producto" });
    }
};

export default {
    getAllProductos,
    cambiarEstadoProducto
};