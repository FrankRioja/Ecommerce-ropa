let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
const botonComprar = document.querySelector(".carrito-acciones-comprar");
const totalElemento = document.querySelector("#total");

function cargarProductosCarrito() {

    if (productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");

            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">

                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>

                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>

                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>

                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>

                <div class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash"></i>
                </div>
            `;

            contenedorCarritoProductos.append(div);
        });

        actualizarBotonesEliminar(); // 🔥 CLAVE

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductosCarrito();
actualizarTotal();

// 🔥 EVENTOS BOTONES
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", restarCantidad);
    });
}


// 🔥 RESTAR CANTIDAD (lo que querías)
function restarCantidad(e) {
    const idBoton = e.currentTarget.id;

    const producto = productosEnCarrito.find(p => p.id == idBoton);

    if (producto) {
        producto.cantidad--;

        if (producto.cantidad <= 0) {
            const index = productosEnCarrito.findIndex(p => p.id == idBoton);
            productosEnCarrito.splice(index, 1);
        }
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    cargarProductosCarrito();
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    if (productosEnCarrito.length === 0) return;

    const confirmar = confirm("¿Querés vaciar el carrito?");

    if (confirmar) {
        productosEnCarrito = [];

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        cargarProductosCarrito();
    }
}







botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    if (productosEnCarrito.length === 0) return;

    const numero = "5491122813122"; // 👈 TU NÚMERO (con código país, sin +)

    let mensaje = "Hola, quiero comprar:\n\n";

    productosEnCarrito.forEach(producto => {
        mensaje += `• ${producto.titulo}\n`;
        mensaje += `Cantidad: ${producto.cantidad}\n`;
        mensaje += `Subtotal: $${producto.precio * producto.cantidad}\n\n`;
    });

    const total = productosEnCarrito.reduce(
        (acc, p) => acc + (p.precio * p.cantidad),
        0
    );

    mensaje += `Total: $${total}`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const url = `https://wa.me/${numero}?text=${mensajeCodificado}`;

    window.open(url, "_blank");

    // limpiar carrito después
    productosEnCarrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}










function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce(
        (acc, producto) => acc + (producto.precio * producto.cantidad),
        0
    );

    totalElemento.innerText = `:$${totalCalculado}`;
}