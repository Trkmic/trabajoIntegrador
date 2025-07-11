document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = Number(params.get("id"));

    if (!productoId) {
        alert("No se especificó ningún ID de producto");
        return;
    }

    const form = document.getElementById("form-editar");

    // Paso 1: Cargar datos del producto
    fetch(`http://localhost:5000/productos`)
        .then(res => res.json())
        .then(data => {
            const producto = data.find(p => p.id === productoId);
            if (!producto) {
                alert("Producto no encontrado");
                return;
            }

            // Rellenar los campos del formulario
            form.nombre.value = producto.nombre;
            form.precio.value = producto.precio;
            form.img.value = producto.img;
            form.categoria.value = producto.categoria;
        })
        .catch(err => {
            console.error(err);
            alert("Error al obtener los datos del producto");
        });

    // Paso 2: Enviar cambios al hacer submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const datosActualizados = {
            nombre: form.nombre.value,
            precio: parseFloat(form.precio.value),
            img: form.img.value,
            categoria: form.categoria.value
        };

        fetch(`http://localhost:5000/productos/${productoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados)
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al actualizar producto");
            return res.json();
        })
        .then(() => {
            alert("Producto actualizado correctamente");
            window.location.href = "/dashboard";
        })
        .catch(err => {
            console.error(err);
            alert("Hubo un error al guardar los cambios");
        });
    });
});