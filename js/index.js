//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});

//Variables Globales
let listaCarrito = [];
let totalFinal;

//Rutas HTML


//Llama a la función crearCards() una vez que el documento ya está cargado
$(document).ready(function() {
    // console.log('se está cargando la tienda');
    crearCards();
}); 


//Funcion para crear las cartas de la tienda
function crearCards(){

    productDB.forEach(el => {
            $('#contenedor-general').append(`
                <div class="col mb-5 producto${el.id}" >
                    <div class="card h-100">
                            <img class="card-img-top" id="img-0" src="${el.img}"/>
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder" id="titulo-0">${el.nombre}</h5>
                                    <!-- Product price-->
                                    <p id="precio">${formatoCL.format(el.precio)}</p>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button class="btn btn-outline-dark mt-auto" href="#"
                                        onclick="agregarCarrito(${el.id})">Añadir al Carrito</button></div>
                            </div>
                    </div>
                </div>
            `);
    });
};

//Funcion para agregar productos al carrito
function agregarCarrito(opc){

    if (listaCarrito.indexOf(productDB[opc]) == -1) {
        console.log(productDB[opc]);
        listaCarrito.push(productDB[opc]);
    } else {
        let pos = listaCarrito.indexOf(productDB[opc]);
        // console.log(`La posicion en el arreglo es ${pos}`);
        listaCarrito[pos].cantidad++;
        // console.log(`La nueva cantidad es ${listaCarrito[pos].cantidad}`);
    }

    calcularMonto();
    renderModal();
};


//Funcion para calcular el total de compra
function calcularMonto() {
    totalFinal = 0;

    listaCarrito.forEach(el => {
        totalFinal = totalFinal + (el.precio*el.cantidad);
        // console.log(`Precio Lista ${el.precio} * Cantidad ${el.cantidad}`);
        // console.log(totalFinal);
    });
}

//Funcion para renderizar el carro en el modal
function renderModal(){
    $('.resumen-carrito').html('');
  listaCarrito.forEach(el => {
    $('.resumen-carrito').append(`
    <div class="lista-carrito">
    <div><img src=${el.img} height="60px"></div>
    <div><h6>${el.nombre}</h6></div>
    <div><input id="input-cantidad-${el.id}" class="shopping-cart-quantity-input shoppingCartItemQuantity" onclick="actualizarCant(${el.id})" type="number" value="${el.cantidad}"></input></div>
    <div>${formatoCL.format(el.precio*el.cantidad)}</div>
    <div onclick=removerProducto(${el.id})><i class="fa-solid fa-trash"></i></div>
    </div>
    `)
  });

  $('#cont-total').html(`Total: ${formatoCL.format(totalFinal)}`);

}



//Funcion para vaciar carrito de compras
function vaciarCarrito(){
    listaCarrito = [];

    calcularMonto();
    renderModal();

}

//Funcion para mostrar formulario
function mostrarForm(){
    $('.cont-formulario-modal').removeClass('d-none');
}

function ocultarForm(){
    $('.cont-formulario-modal').addClass('d-none');
}


//Funcion para validar Form
function validarForm(){
    const forms = document.querySelectorAll('.needs-validation');

    let estado = false; 

    forms.forEach(form => {
        if (form.checkValidity()) { 
            estado = true;
        };

        form.classList.add('was-validated');
    });

    return estado;
};  


//Funcion para remover un producto
function removerProducto(opc) {
    listaCarrito.splice(listaCarrito[opc],1);
    // console.log(listaCarrito);
    calcularMonto();
    renderModal();
}

//Funcion para actualizar cantidad
function actualizarCant(opc) {

console.log(`La ID del producto es ${opc}`);

let pos = listaCarrito.indexOf(productDB[opc]); 
console.log(`La posicion de este producto en el carrito es ${pos}`);

// document.querySelector(`#input-cantidad-${opc}`)


}