//Variables Globales
let arrProductos = [];


//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});



//Al cargar la página añade la tienda al arreglo y le inserta los productos
window.addEventListener("load", function(event) {
    
    arrProductos = new Tienda('Tienda');


    if (JSON.parse(localStorage.getItem("arr-productos")) != null){
        arrProductos = JSON.parse(localStorage.getItem("arr-productos"));
        } else {

        productDB.forEach(el => {
            let producto = new Producto(el.id,el.nombre,el.precio,el.img,el.cat,el.stock);
            arrProductos.setProductos(producto); 
        });
    }
    crearCards();
}); 



//Esta función respalda la variable local arrProductos en Local Storage
function respaldoLocal(){
    localStorage.setItem('arr-productos',JSON.stringify(arrProductos));   
}

//Funcion para crear las cartas de la tienda
function crearCards(){

    arrProductos.getProductos().forEach(el => {
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

