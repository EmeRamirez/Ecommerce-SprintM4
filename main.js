//Variable Global
let arregloProductosClass = [];
let listaCarrito = [];
let totalFinal;

//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});

//Esta funcion crea el arreglo de productos en base al JSON bd.js
productDB.forEach (element => {
    let producto = new Producto(element.id,element.nombre,element.precio,element.img,element.cat);
    arregloProductosClass.push(producto);
})

//Llama a la función crearCards() una vez que el documento ya está cargado
$(document).ready(function() {
    // console.log('se está cargando la tienda');
    crearCards();
}); 

//Funcion para crear las cartas de la tienda
function crearCards(){

    arregloProductosClass.forEach(el => {
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

