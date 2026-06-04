let productos = [];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCatalogo = document.querySelectorAll(".boton-catalogo");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Renderiza productos en pantalla
function cargarProductos(productosMostrados) {
    contenedorProductos.innerHTML = "";

    productosMostrados.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productos");

        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.appendChild(div);
    });

    actualizarBotonesAgregar()

}

// Carga inicial
// Carga productos desde JSON
fetch("./data/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
    });

// Filtro por categoría
botonCatalogo.forEach(boton => {
    boton.addEventListener("click", () => {
        const categoria = boton.id;

        if (categoria === "todos") {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        } else {
            const filtrados = productos.filter(
                producto => producto.categoria.id === categoria
            );

            tituloPrincipal.innerText = filtrados[0].categoria.nombre; // 👈 aquí se actualiza el título

            cargarProductos(filtrados);
        }
    });
});

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
        })
}

let productosEnCarrito;
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if(productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else{
    productosEnCarrito = [];
}


function agregarAlCarrito(e){
    const idBoton = Number(e.currentTarget.id);
    const productoAgregado = productos.find(producto => producto.id ===idBoton )

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito [index].cantidad++;

    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push({ ...productoAgregado, cantidad: 1 });
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito;
}

