export class Producto{
    constructor() {
    }
    obtenerProductos(){
    return fetch('https://bsite.net/metalflap/td-producto')
        .then(response => response.json())
        .then(data => {
            const listacervezas= []
            data.forEach(chela => {
                if (chela.idSucursal == 3){
                    listacervezas.push(chela)
                    
                }
            });
            return listacervezas
            
        })
        
    }

    getProductoByID(id){
        fetch(`https://bsite.net/metalflap/td-producto/${id}`)
            .then(res => res.json())
            .then,(data => {
                return data
            })
    }

    crearProducto(producto){
        fetch('https://bsite.net/metalflap/td-producto',
        {method:'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify(producto)})
        .then(alert('Producto creado exitosamente'))
        .then(
            setTimeout(() => {
                document.location.reload()
            }, 1800)
        )
        .catch (err => console.log(err))

    }

    borrarProducto(id){
        fetch(`https://bsite.net/metalflap/td-producto/${id}`,
        {method: 'DELETE', 
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (
            alert('Producto Eliminado'))
        .then(
            setTimeout(() => {
                document.location.reload()
            }, 1800)
        )
        .catch (err => console.log(err))
        
    }

    modificarProducto(id){
        let producto = {
            id: id,
            nombre: prodNombre.value,
            precio: prodPrecio.value,
            link: prodImg.value,
            stock: prodStock.value,
            etiqueta: prodEtiq.value,
            descripcion: "-",
            idCategoria: 13,
            idSucursal: 3,
        }

        console.log(JSON.stringify(producto));

        fetch('https://bsite.net/metalflap/td-producto',
        {method: 'PUT', 
        body: JSON.stringify(producto),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (
            alert('Producto Actualizado'))
        .then(
            setTimeout(() => {
                document.location.reload()
            }, 1800)
        )
        .catch (err => console.log(err))
    }
}


const prodNombre = document.querySelector('#prod-nombre');
const prodPrecio = document.querySelector('#prod-precio');
const prodImg = document.querySelector('#prod-img');
const prodEtiq = document.querySelector('#prod-etiquetas');
const prodStock = document.querySelector('#prod-stock');