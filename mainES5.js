let arrProductos = [];

window.addEventListener("load", function(event) {
    arrProductos = new Tienda('Tienda');

    productDB.forEach(el => {
        let producto = new Producto(el.id,el.nombre,el.precio,el.img,el.cat,el.stock);
        arrProductos.setProductos(producto); 
    });
}); 




    

