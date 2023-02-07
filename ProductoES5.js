function Producto(id,nombre,precio,img,cat,stock){
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.img = img
    this.cantidad = 1
    this.cat = cat
    this.stock = stock
}
    
Producto.prototype.setStock = function(stock){
    this.stock = stock;
}

Producto.prototype.getStock = function(){
    return this.stock;
}
   
Producto.prototype.getCantidad = function(){
    return this.cantidad;
}



