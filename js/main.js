import { Carrito } from "../class/Carrito.js";
import { Producto } from "../class/Producto.js";

let carrito = new Carrito

const productos = new Producto();

window.onload = () => {

    if (JSON.parse(localStorage.getItem("arr-carrito")) != null) {
        let localCart = JSON.parse(localStorage.getItem("arr-carrito"));
        localCart.forEach(el => {
            carrito.setItem(el);
        })

        renderModal(carrito.getItems())
    }

    productos.obtenerProductos()
        .then(productos => {
            crearCards(productos)
        })
        
}


//Funcion para crear cards de la tienda

function crearCards(arr){
    const contGral = document.querySelector('#contenedor-general');
    contGral.innerHTML = '';
    
    arr.forEach(el => {
        $(contGral).append (`
        <div class="col mb-5 producto${el.id} filtro-input" >
            <div class="card h-100">
                    <img class="card-img-top img${el.id}" id="img" src="${el.link}"/>
                    <!-- Product details-->
                    <div class="card-body p-3">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder card-titulo" id="titulo">${el.nombre}</h5>                          
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <!-- Product price-->
                    <p id="precio">${formatoCL.format(el.precio)}</p>    
                    <p id="stock${el.id}" class="stock">Stock: ${el.stock}</p> 
                        <div class="text-center"><button id="btnAgregar${el.id}" value="${el.id}" class="btn btn-outline-dark mt-auto" href="#"
                                >Añadir al Carrito</button></div>
                    </div>
            </div>
        </div>`);

        document.querySelector(`#btnAgregar${el.id}`).addEventListener('click', function(){
            let btn = document.querySelector(`#btnAgregar${el.id}`);

            btn.classList.add("animate__heartBeat");

            btn.addEventListener('animationend', () => {
                btn.classList.remove("animate__heartBeat");
            });

            const productos = new Producto
            productos.obtenerProductos()
            .then(productos => {
                let item = productos.find(e => e.id == el.id) 
                carrito.setItem(item);
                renderModal(carrito.getItems());
                respaldoLocal();
            })
        });

        switch (true) {
            case (el.stock == 0):
                document.querySelector(`#btnAgregar${el.id}`).setAttribute('disabled', true);
                document.querySelector(`#btnAgregar${el.id}`).innerText = ("Sin Stock");
                document.querySelector(`.img${el.id}`).style.filter = "grayscale(1)";
                break;
            case (el.stock == 1):
                document.querySelector(`#stock${el.id}`).innerText = ("¡Última unidad!");
                document.querySelector(`#stock${el.id}`).style.color = "rgb(224, 107, 107)";
                break;
            case (el.stock <= 4):
                document.querySelector(`#stock${el.id}`).innerText = (`¡Últimas ${el.stock} unidades`);
                document.querySelector(`#stock${el.id}`).style.color = "rgb(224, 107, 107)";
                break;
        }

    })
}

function renderModal(arr){
    // console.log(arr);
    $('.resumen-carrito').html('');
    arr.forEach(function (el, index) {
        $('.resumen-carrito').append(`
    <div class="lista-carrito">
        <div><img src=${el.link} height="60px"></div>
        <div><h6>${el.nombre}</h6></div>
        
        <input id="input-cant" class="input-cantidad-${el.id} shopping-cart-quantity-input shoppingCartItemQuantity"  type="number" value="${el.cantidad}"></input>
        
        <div>${formatoCL.format(el.precio * el.cantidad)}</div>
        <button type="button" class="btn btnmod" id="removerProducto${el.id}"><i class="fa-solid fa-trash"></i></button>
    </div>
    `);

    document.querySelector(`#removerProducto${el.id}`).addEventListener('click', function(){
        carrito.removeItem(el.id);
        renderModal(carrito.getItems());
        respaldoLocal();
        
    })

    document.querySelector(`.input-cantidad-${el.id}`).addEventListener('change', function(){
        let cant = document.querySelector(`.input-cantidad-${el.id}`).valueAsNumber;

        carrito.ajustarCantidad(el.id , cant);
        renderModal(carrito.getItems());
        respaldoLocal()
    })

    });

    $('#cont-total').html(`Total: ${formatoCL.format(calcularMonto(carrito.getItems()))}`);
}


//Funcion para calcular el total de compra
function calcularMonto(arr) {
    let totalFinal = 0;

    arr.forEach(el => {
        totalFinal = totalFinal + (el.precio * el.cantidad);
        // console.log(`Precio Lista ${el.precio} * Cantidad ${el.cantidad}`);
        // console.log(totalFinal);
    });

    return totalFinal;
}

document.querySelector('#btnVaciar').addEventListener('click', ()=>{
    vaciarCarrito();
    renderModal(carrito.getItems());
})

//Funcion para vaciar el carrito de compras
function vaciarCarrito() {
    carrito.vaciarCarrito();
    respaldoLocal();
}

//Esta función respalda el carrito de compras en Local Storage
function respaldoLocal() {
    console.log(carrito.getItems());
    localStorage.setItem('arr-carrito', JSON.stringify(carrito.getItems()));
}

document.querySelector('.boton-form').addEventListener('click',() =>{
    if (!carrito.getItems().length == 0) {
        if (validarForm()) {
            ajustarStock();
            setTimeout(() => {
                document.location.reload()
            }, 3000);
        } else {
            document.querySelector('#requerido').classList.remove('d-none');
            setTimeout(() => {
                document.querySelector('#requerido').classList.add('d-none');
            }, 1000);
        }
    } else {
        alert('Debe añadir al menos un producto al carro');
    }
})


//Esta función ajusta el stock con la base de datos (API Fetch) una vez realizada la compra
function ajustarStock(){
    console.log('Acá se reduce el stock');
}


//Funciones de filtro ====================================================


function resetFiltro() {
    selectEtiq.selectedIndex = 0;
    productos.obtenerProductos()
    .then(productos => crearCards(productos));
    
}

let searchInput = document.getElementById("search-input");

searchInput.addEventListener('click', ()=> {
    resetFiltro()
})

// Función de búsqueda por categoría
const selectEtiq = document.getElementById("etiq-list");

selectEtiq.addEventListener('change',()=>{

    if (selectEtiq.selectedIndex != 0){
        let productosFiltrados = [];
        productos.obtenerProductos()
        .then(productos => productos.forEach(el => {
            if (el.etiqueta.includes(selectEtiq.value)){
                productosFiltrados.push(el);
            }
            crearCards(productosFiltrados);
        }))
    } else {
        productos.obtenerProductos()
        .then(productos => {crearCards(productos)})
    }
})



//Función de búsqueda por rango de precio
const selectRange = document.getElementById('range-filter')

selectRange.addEventListener("click", async function () {
    await resetFiltro();
    const arr = await productos.obtenerProductos()
    getSelectRange(arr)    
})

function getSelectRange(arr){
    const selectRange = document.getElementById('range-filter').valueAsNumber;


    arr.forEach(el => {
        if (selectRange >= el.precio){
            document.querySelector(`.producto${el.id}`).style.display='block'
        }else {
            document.querySelector(`.producto${el.id}`).style.display='none'
        }
        
    } )

} 


// Funcion Live Search

searchInput.addEventListener("input", function() {
    
    const cardContainer = document.getElementById("contenedor-general");
    const cards = cardContainer.getElementsByClassName("filtro-input");

    const searchTerm = searchInput.value.toLowerCase();

    for (let i = 0; i < cards.length; i++) {
    const cardText = cards[i].getElementsByClassName("card-titulo")[0];
    if (cardText.innerText.toLowerCase().includes(searchTerm)) {
        cards[i].classList.remove("d-none");
    } else {
        cards[i].classList.add("d-none");
    }
    }
});

//=========================================

//Falta completar la función ajustar Stock