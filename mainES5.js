//Variables Globales
let arrProductos = [];
let listaCarrito = [];
let totalFinal;
let listaCarritoMap;



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
    listaCarritoMap = arrProductos.getProductos().map(object => ({ ...object }));
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
                            <img class="card-img-top img${el.id}" id="img" src="${el.img}"/>
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder" id="titulo">${el.nombre}</h5>
                                    <!-- Product price-->
                                    <p id="precio">${formatoCL.format(el.precio)}</p>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button id="boton-ql${el.id}" class="btn btn-outline-dark mt-auto" href="#"
                                        onclick="agregarCarrito(${el.id})">Añadir al Carrito</button></div>
                            </div>
                    </div>
                </div>
            `);
    });

    arrProductos.getProductos().forEach(el => {
        if (el.stock < 1) {
            document.querySelector(`#boton-ql${el.id}`).setAttribute('disabled', true);
            document.querySelector(`#boton-ql${el.id}`).innerText=("Sin Stock");
            document.querySelector(`.img${el.id}`).style.filter="grayscale(1)";
        }
    })
 
};

//Funcion para agregar productos al carrito
function agregarCarrito(id){
    
    if (listaCarrito.indexOf(listaCarritoMap[id]) == -1) {
        // console.log(arrProductos.getProductos()[id].nombre);
        listaCarrito.push(listaCarritoMap[id]);
    } else {
        let pos = listaCarrito.indexOf(listaCarritoMap[id]);
        console.log(`La posicion en el arreglo es ${pos}`);
            if((listaCarrito[pos].cantidad +1)<=(listaCarrito[pos].stock)){
                listaCarrito[pos].cantidad++;
            }else{
                console.log("No se puede agregar más de este producto");  
            }

        console.log(`La nueva cantidad es ${listaCarrito[pos].cantidad}`);
    }

    calcularMonto();
    renderModal();
   
};


//Funcion para calcular el total de compra
function calcularMonto() {
    totalFinal = 0;

    listaCarrito.forEach(el => {
        totalFinal = totalFinal + (el.precio*el.cantidad);
        console.log(`Precio Lista ${el.precio} * Cantidad ${el.cantidad}`);
        console.log(totalFinal);
    });
}

//Funcion para renderizar el carro en el modal
function renderModal(){
    $('.resumen-carrito').html('');
  listaCarrito.forEach(function(el,index){
    $('.resumen-carrito').append(`
    <div class="lista-carrito">
    <div><img src=${el.img} height="60px"></div>
    <div><h6>${el.nombre}</h6></div>
    <div><input id="input-cant" class="input-cantidad-${index} shopping-cart-quantity-input shoppingCartItemQuantity" onchange="actualizarCant(${index})" type="number" value="${el.cantidad}"></input></div>
    <div>${formatoCL.format(el.precio*el.cantidad)}</div>
    <div onclick=removerProducto(${index})><i class="fa-solid fa-trash"></i></div>
    </div>
    `)
  });

  $('#cont-total').html(`Total: ${formatoCL.format(totalFinal)}`);
}

//Funcion para vaciar carrito de compras
function vaciarCarrito(){
    listaCarrito = [];
    listaCarritoMap = arrProductos.getProductos().map(object => ({ ...object }));

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

function actualizarCant(index){


    let valor = document.querySelector(`.input-cantidad-${index}`).valueAsNumber;
    if (valor <= 0){
        valor = 1 ;
    } 

    if (valor > listaCarrito[index].stock){
        valor = listaCarrito[index].stock;
        document.querySelector('.mensaje-stock').classList.remove('d-none');

        setTimeout(() => {
            document.querySelector('.mensaje-stock').classList.add('d-none');
          }, "1500")
    }

    listaCarrito[index].cantidad = valor;
    calcularMonto();
    renderModal();
}


//Funcion para remover un producto
async function removerProducto(opc) {
    console.log(opc);
    (listaCarrito[opc].cantidad = 1);
    console.log(`La nueva cantidad de ${listaCarrito[opc].nombre} es ${listaCarrito[opc].cantidad}`);
    listaCarrito.splice(opc,1);
    calcularMonto();
    renderModal();
}

function ajustarStock(){
    if(validarForm()){
        
        //ACA VA EL CODIGO QUE AJUSTA STOCK

    } else {
        console.log('llena la wea ctm');
    }
}

