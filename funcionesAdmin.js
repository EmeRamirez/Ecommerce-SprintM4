//Rutas del DOM
const prodID = document.querySelector('#prod-id');
const prodNombre = document.querySelector('#prod-nombre');
const prodPrecio = document.querySelector('#prod-precio');
const prodImg = document.querySelector('#prod-img');
const prodEtiq = document.querySelector('#prod-etiqueta');
const prodStock = document.querySelector('#prod-stock');

const newprodID = document.querySelector('#newprod-id');
const newprodNombre = document.querySelector('#newprod-nombre');
const newprodPrecio = document.querySelector('#newprod-precio');
const newprodImg = document.querySelector('#newprod-img');
const newprodEtiq = document.querySelector('#newprod-etiqueta');
const newprodStock = document.querySelector('#newprod-stock');

//============================================================

//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});


//Funcion para validar formularios
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


//Funcion para crear cards en el DOM

function crearCards(arr){
    arr.forEach(el => {
        $('#contenedor-general').append(`
            <div class="col mb-5 producto${el.id}" >
                <div class="card h-100">
                        <img class="card-img-top img${el.id}" id="img" src="${el.link}"/>
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
                            <div class="text-center botones-card"><button id="boton-ql${el.id}" type="button" class="btn btn-warning mt-auto
                            btnEditar" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#"
                                    value="${el.id}">Editar</button><button type="button" class="btn btn-danger btnEliminar"
                                    value="${el.id}"><i class="fa-solid fa-trash"></i></button></div>
                        </div>
                </div>
            </div>
        `);
    })
}



function renderNuevoEjemplo(){
    if (validarForm()){
        document.querySelector('#nombre-ejemplo').innerText=(`${newprodNombre.value}`);
        document.querySelector('#precio-ejemplo').innerText=(`${formatoCL.format(newprodPrecio.value*1)}`);
        document.querySelector('#img-ejemplo').setAttribute("src",`${newprodImg.value}`);
        document.querySelector('#stock-ejemplo').innerText=(`Stock: ${newprodStock.value*1}`);
    }
}

function crearBotones(id){
    document.querySelector('#footer-editar').innerHTML=''
    document.querySelector('#footer-editar').innerHTML=`
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-warning btnCambios" value="${id}">Guardar Cambios</button>`
}

