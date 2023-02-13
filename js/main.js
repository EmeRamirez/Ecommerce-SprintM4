//Variables Globales
let tienda = [];
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
$(document).ready(function () {


    //Este fetch trae la información del archivo .json y lo almacena en el arreglo 'productDB'
    fetch('data/bd.json')
    .then(response => response.json())
    .then(json => {
        // console.log(json);
        productDB=json.productos;
        console.log(productDB);
    })
    .then(()=>{
            tienda = new Tienda('Tienda');

        if (JSON.parse(localStorage.getItem("arr-carrito")) != null) {
            listaCarrito = JSON.parse(localStorage.getItem("arr-carrito"));
        }

        if (JSON.parse(localStorage.getItem("arr-database")) != null) {
            productDB = JSON.parse(localStorage.getItem("arr-database"));
        }


        productDB.forEach(el => {
            let producto = new Producto(el.id, el.nombre, el.precio, el.img, el.cat, el.stock);
            tienda.setProductos(producto);
        });

        listaCarritoMap = tienda.getProductos().map(object => ({ ...object }));
        crearCards();
        calcularMonto();
        renderModal();
    })
    .catch (err => console.log(err));
  
});



//Esta función respalda la variable local tienda en Local Storage
function respaldoLocal() {
    localStorage.setItem('arr-carrito', JSON.stringify(listaCarrito));
    localStorage.setItem('arr-database', JSON.stringify(productDB));
}

//Funcion para crear las cartas de la tienda
function crearCards() {

    tienda.getProductos().forEach(el => {
        $('#contenedor-general').append(`
            <div class="col mb-5 producto${el.id} ${el.cat} filtro-input" >
                <div class="card h-100">
                        <img class="card-img-top img${el.id}" id="img" src="${el.img}"/>
                        <!-- Product details-->
                        <div class="card-body p-3">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder" id="titulo">${el.nombre}</h5>                          
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <!-- Product price-->
                        <p id="precio">${formatoCL.format(el.precio)}</p>    
                        <p id="stock${el.id}" class="stock">Stock: ${el.stock}</p> 
                            <div class="text-center"><button id="boton-ql${el.id}" class="btn btn-outline-dark mt-auto" href="#"
                                    onclick="agregarCarrito(${el.id})">Añadir al Carrito</button></div>
                        </div>
                </div>
            </div>
        `);

        switch (true) {
            case (el.stock == 0):
                document.querySelector(`#boton-ql${el.id}`).setAttribute('disabled', true);
                document.querySelector(`#boton-ql${el.id}`).innerText = ("Sin Stock");
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

    });

};

//Funcion para agregar productos al carrito
function agregarCarrito(id) {

    if (listaCarrito.indexOf(listaCarritoMap[id]) == -1) {
        // console.log(tienda.getProductos()[id].nombre);
        listaCarrito.push(listaCarritoMap[id]);
    } else {
        let pos = listaCarrito.indexOf(listaCarritoMap[id]);
        console.log(`La posicion en el arreglo es ${pos}`);
        if ((listaCarrito[pos].cantidad + 1) <= (listaCarrito[pos].stock)) {
            listaCarrito[pos].cantidad++;
        } else {
            console.log("No se puede agregar más de este producto");
        }

        console.log(`La nueva cantidad es ${listaCarrito[pos].cantidad}`);
    }

    calcularMonto();
    respaldoLocal();
    renderModal();

};


//Funcion para calcular el total de compra
function calcularMonto() {
    totalFinal = 0;

    listaCarrito.forEach(el => {
        totalFinal = totalFinal + (el.precio * el.cantidad);
        console.log(`Precio Lista ${el.precio} * Cantidad ${el.cantidad}`);
        console.log(totalFinal);
    });
}

//Funcion para renderizar el carro en el modal
function renderModal() {
    $('.resumen-carrito').html('');
    listaCarrito.forEach(function (el, index) {
        $('.resumen-carrito').append(`
    <div class="lista-carrito">
    <div><img src=${el.img} height="60px"></div>
    <div><h6>${el.nombre}</h6></div>
    <div><input id="input-cant" class="input-cantidad-${index} shopping-cart-quantity-input shoppingCartItemQuantity" onchange="actualizarCant(${index})" type="number" value="${el.cantidad}"></input></div>
    <div>${formatoCL.format(el.precio * el.cantidad)}</div>
    <div onclick=removerProducto(${index})><i class="fa-solid fa-trash"></i></div>
    </div>
    `)
    });

    $('#cont-total').html(`Total: ${formatoCL.format(totalFinal)}`);
}

//Funcion para vaciar carrito de compras
function vaciarCarrito() {
    listaCarrito = [];
    listaCarritoMap = tienda.getProductos().map(object => ({ ...object }));

    respaldoLocal();
    calcularMonto();
    renderModal();

}




//Funcion para mostrar formulario
function mostrarForm() {
    $('.cont-formulario-modal').removeClass('d-none');
}

function ocultarForm() {
    $('.cont-formulario-modal').addClass('d-none');
}

//Funcion para validar Form
function validarForm() {
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

function actualizarCant(index) {


    let valor = document.querySelector(`.input-cantidad-${index}`).valueAsNumber;
    if (valor <= 0) {
        valor = 1;
    }

    if (valor > listaCarrito[index].stock) {
        valor = listaCarrito[index].stock;
        document.querySelector('.mensaje-stock').classList.remove('d-none');

        setTimeout(() => {
            document.querySelector('.mensaje-stock').classList.add('d-none');
        }, 1500)
    }

    listaCarrito[index].cantidad = valor;

    respaldoLocal();
    calcularMonto();
    renderModal();
}


//Funcion para remover un producto
function removerProducto(opc) {
    (listaCarrito[opc].cantidad = 1);
    listaCarrito.splice(opc, 1);
    respaldoLocal();
    calcularMonto();
    renderModal();
}

function ajustarStock() {
    tienda.getProductos().forEach(el => {
        listaCarrito.forEach(elem => {
            if (el.id == elem.id) {
                el.setStock(elem.stock - elem.cantidad);
                elem.stock = el.getStock();
            };
        })
    })
}

//Esta función actualiza el stock del arreglo BD
function pagar() {
    if (!listaCarrito.length == 0) {
        if (validarForm()) {
            ajustarStock();
            productDB = tienda.getProductos();
            enviarMail();
            listaCarrito = [];
            respaldoLocal();
            setTimeout(() => {
                document.location.reload()
            }, 3000);
        } else {
            document.querySelector('#requerido').classList.remove('d-none');
            setTimeout(() => {
                document.querySelector('#requerido').classList.add('d-none');
            }, 1000)
        }
    } else {
        alert('Debe añadir al menos un producto al carro');
    }

}

function enviarMail() {

    let prodSinStock = '';
    tienda.getProductos().forEach(el => {
        if (el.stock == 0) {
            prodSinStock = prodSinStock + `<li>${el.nombre}</li>`

            var params = {
                from_name: "The Chela Store",
                email_id: "ventas@thechelastore.com",
                arrsinstock: prodSinStock
            }
            emailjs.send("pago_stock", "template_gj4475e", params).then(function (res) {
                console.log('Mail enviado' + res.status);
                alert('Email Enviado! (Esto debería ser un modal más bonito jaja');
            });
            
        } else {
            console.log('No hay productos sin stock');
        }

       
    })
     
};

function getSelectedValue() {
    const selectValue = document.getElementById("list").value;
    const acceptedValues = ['clara', 'oscura'];
    const productCards = document.querySelectorAll('.filtro-input');
  
    productCards.forEach(card => {
      if(acceptedValues.includes(selectValue)) {
        if(card.classList.contains(selectValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      } else {
        card.style.display = 'block';
      }
    })
  }
