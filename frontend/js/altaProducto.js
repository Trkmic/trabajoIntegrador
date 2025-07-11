document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-editar");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const datos = {
            nombre: form.nombre.value.trim(),
            precio: parseFloat(form.precio.value),
            img: form.img.value.trim(),
            categoria: form.categoria.value
        };

        fetch("http://localhost:5000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al crear el producto");
                return res.json();
            })
            .then(data => {
                alert("Producto creado correctamente");
                window.location.href = "/dashboard";
            })
            .catch(err => {
                console.error(err);
                alert("Error al crear el producto");
            });
    });
});