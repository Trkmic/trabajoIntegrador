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
        const valorActivo = activo ? 1 : 0;
        const productoActualizado = await productoService.actualizarEstado(id, valorActivo);

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

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, img, categoria } = req.body;

    if (!nombre || !precio || !img || !categoria) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const actualizado = await productoService.actualizarProducto(id, { nombre, precio, img, categoria });

        if (!actualizado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            producto: actualizado
        });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export default {
    getAllProductos,
    cambiarEstadoProducto,
    actualizarProducto
};