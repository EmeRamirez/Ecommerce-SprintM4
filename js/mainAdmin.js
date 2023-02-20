import { Producto } from "../class/Producto.js";


//Rutas del DOM


const newprodID = document.querySelector('#newprod-id');
const newprodNombre = document.querySelector('#newprod-nombre');
const newprodPrecio = document.querySelector('#newprod-precio');
const newprodImg = document.querySelector('#newprod-img');
const newprodEtiq = document.querySelector('#newprod-etiquetas');
const newprodStock = document.querySelector('#newprod-stock');

//================================================================

const productos = new Producto();

window.onload = () => {
    productos.obtenerProductos()
        .then(productos => {
            crearCardsAdmin(productos)
        }
        )
}

const crear = document.querySelector("#btnCrearProd");
crear.addEventListener("click", function () {
    if (validarForm()) {
        productos
            .crearProducto({
                id: 0,
                nombre: newprodNombre.value,
                precio: newprodPrecio.value * 1,
                link: newprodImg.value,
                stock: newprodStock.value * 1,
                etiqueta: newprodEtiq.value,
                descripcion: "-",
                idCategoria: 13,
                idSucursal: 3,
            })
    } else {
        alert('Complete todos los campos')
    }
});

$(document).on("click", 'button[type="button"]', function () {
    if (this.classList.contains("btnEliminar")) {
        let id = this.value
        let confirmar = confirm("¿Está seguro que desea eliminar este producto?");
        if (confirmar) {
            productos.borrarProducto(id)
        }
    } else if ((this.classList.contains("btnEditar"))) {
        let id = this.value

        crearBotones(id);
        var producto = new Producto
        productos.obtenerProductos()
            .then(productos => {
            renderEditar(productos,id);
            })


    } else if ((this.classList.contains("btnCambios"))) {
        let id = this.value

        if (validarForm()) {
            productos.modificarProducto(id)
        } else {
            alert('Complete los campos')
        }

    }
})



