

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



//Funcion para mostrar formulario
function mostrarForm() {
    $('.cont-formulario-modal').removeClass('d-none');
}

function ocultarForm() {
    $('.cont-formulario-modal').addClass('d-none');
}



