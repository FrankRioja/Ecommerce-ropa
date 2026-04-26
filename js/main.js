const productos = [
    {
        id: 1,
        titulo: "Pantalon baggy",
        imagen: "./img/baggy-1.jpeg",
        categoria: {
            nombre: "Baggy",
            id: "baggy"
        },
        precio: 18500
    },
    {
        id: 2,
        titulo: "Pantalon baggy",
        imagen: "./img/baggy-2.jpeg",
        categoria: {
            nombre: "Baggy",
            id: "baggy"
        },
        precio: 17800
    },
    {
        id: 3,
        titulo: "Pantalon baggy",
        imagen: "./img/baggy-3.jpeg",
        categoria: {
            nombre: "Baggy",
            id: "baggy"
        },
        precio: 12900
    },
    {
        id: 4,
        titulo: "Pantalon mom",
        imagen: "./img/mom-1.jpeg",
        categoria: {
            nombre: "Mom",
            id: "mom"
        },
        precio: 12300
    },
    {
        id: 5,
        titulo: "Pantalon mom",
        imagen: "./img/mom-2.jpeg",
        categoria: {
            nombre: "Mom",
            id: "mom"
        },
        precio: 14800
    },
    {
        id: 6,
        titulo: "Short",
        imagen: "./img/short-1.jpeg",
        categoria: {
            nombre: "Shorts",
            id: "shorts"
        },
        precio: 9400
    },
    {
        id: 7,
        titulo: "Short",
        imagen: "./img/short-2.jpeg",
        categoria: {
            nombre: "Shorts",
            id: "shorts"
        },
        precio: 13000
    },
    {
        id: 8,
        titulo: "Short",
        imagen: "./img/short-3.jpeg",
        categoria: {
            nombre: "Shorts",
            id: "shorts"
        },
        precio: 9000
    },
    {
        id: 9,
        titulo: "Short",
        imagen: "./img/short-4.jpeg",
        categoria: {
            nombre: "Shorts",
            id: "shorts"
        },
        precio: 10400
    },
    {
        id: 10,
        titulo: "Short",
        imagen: "./img/short-5.jpeg",
        categoria: {
            nombre: "Shorts",
            id: "shorts"
        },
        precio: 13400
    }
];


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
cargarProductos(productos);

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

