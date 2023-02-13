//Variables Globales
let tienda = [];
let listaCarrito = [];
let totalFinal;
let listaCarritoMap;

//Rutas del DOM
prodID = document.querySelector('#prod-id');
prodNombre = document.querySelector('#prod-nombre');
prodPrecio = document.querySelector('#prod-precio');
prodImg = document.querySelector('#prod-img');
prodCat = document.querySelector('#prod-categoria');
prodStock = document.querySelector('#prod-stock');

newprodID = document.querySelector('#newprod-id');
newprodNombre = document.querySelector('#newprod-nombre');
newprodPrecio = document.querySelector('#newprod-precio');
newprodImg = document.querySelector('#newprod-img');
newprodCat = document.querySelector('#newprod-categoria');
newprodStock = document.querySelector('#newprod-stock');



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
        // console.log(productDB);
    })
    .then(()=>{
        tienda = new Tienda('Tienda');

        if (JSON.parse(localStorage.getItem("arr-database")) != null) {
            productDB = JSON.parse(localStorage.getItem("arr-database"));
        }
    
    
    
        productDB.forEach(el => {
            let producto = new Producto(el.id, el.nombre, el.precio, el.img, el.cat, el.stock);
            tienda.setProductos(producto);
        });
    
        listaCarritoMap = tienda.getProductos().map(object => ({ ...object }));
        crearCards(tienda.getProductos());     
    })
    .catch (err => console.log(err));
  
    
    
});

function respaldoDB() {
    crearCards(productDB);
    localStorage.setItem('arr-database', JSON.stringify(productDB));
    alert('Se han guardado los cambios');
    setTimeout(() => {
        document.location.reload()
    }, 3000);
}

//Funcion para crear las cartas de la tienda
function crearCards(arr) {
    $('#contenedor-general').html('');

    arr.forEach(function(el,index) {
        $('#contenedor-general').append(`
            <div class="col mb-5 producto${el.id}" >
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
                            <div class="text-center botones-card"><button id="boton-ql${el.id}" class="btn btn-warning mt-auto" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#"
                                    onclick="editarProducto(${el.id})">Editar</button><button type="button" class="btn btn-danger"
                                    onclick="eliminarProductoDB(${index})"><i class="fa-solid fa-trash"></i></button></div>
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


function editarProducto(id){
    document.querySelector('.btn-editar-modal').innerHTML=(`<button class="btn btn-outline-warning" onclick="modificarProducto(${id})">Modificar</button>`);
    renderInfoProducto(id);
}


function renderInfoProducto(id){
    productDB.forEach(el => {
        if (el.id == id) {
            prodID.value = `ID: ${el.id}`;
            document.querySelector('.seccion-info-producto').innerHTML=`
                <p><b>ID:</b> ${el.id}</p>
                <p><b>Nombre:</b> ${el.nombre}</p>
                <p><b>Precio:</b> ${formatoCL.format(el.precio)}</p>
                <p><b>Link Imagen:</b> ${el.img}</p>
                <p><b>Categoria:</b> ${el.cat}</p>
                <p><b>Cantidad en Stock:</b> ${el.stock}</p>`
        }
    })
}

function modificarProducto(id){
    if (validarForm()){  
        productDB.forEach(el => {
            if (el.id == id) {
                el.nombre = prodNombre.value;
                el.precio = prodPrecio.value * 1;
                el.img    = prodImg.value;
                el.cat    = prodCat.value;
                el.stock  = prodStock.value * 1;
                console.log(el);
                console.log(productDB);
                renderInfoProducto(id);
            }
        })
    }
}

function renderNuevoEjemplo(){
   if(validarForm()){
        newprodID.value=(`${productDB.length}`);
        document.querySelector('#nombre-ejemplo').innerText=(`${newprodNombre.value}`);
        document.querySelector('#precio-ejemplo').innerText=(`${formatoCL.format(newprodPrecio.value*1)}`);
        document.querySelector('#img-ejemplo').setAttribute("src",`${newprodImg.value}`);
        document.querySelector('#stock-ejemplo').innerText=(`Stock: ${newprodStock.value*1}`);
    }
}

function almacenarProductoNuevo(){
    let producto = new Producto (newprodID.value*1 , newprodNombre.value , newprodPrecio.value*1 , newprodImg.value , newprodCat.value , newprodStock.value*1);
    producto=JSON.stringify(producto);
    let confirmar = confirm('¿Desea añadir el nuevo producto?');
    if (confirmar){
        productDB.push(JSON.parse(producto));
    } 
    respaldoDB();
}

function eliminarProductoDB(index) {
    let confirmar = confirm("¿Está seguro que desea eliminar este producto?");
    if (confirmar) {
        productDB.splice(index,1);

        productDB.forEach(function(el,index){
            el.id = index;
        })
    }
    respaldoDB();
}


function confirmarNuevoProducto(){
    let prueba = new Producto (8,"Alameda Cripi",4600,"assets/img/img8.webp","clara",10);
    prueba=JSON.stringify(prueba);
    prueba=JSON.parse(prueba);
    productDB.push(prueba);
}



