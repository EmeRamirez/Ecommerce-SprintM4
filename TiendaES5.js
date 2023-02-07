function Tienda (nombre){
    this.nombre    = nombre;
    this.productos = [];
}

Tienda.prototype.setProductos = function(producto){
    this.productos.push(producto);
}

Tienda.prototype.getProductos = function(){
    return this.productos;
}