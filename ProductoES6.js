class Producto {
    constructor(id, nombre, precio, img, cat, stock) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.img = img
        this.cantidad = 1
        this.cat = cat
        this.stock = stock
    }
    setStock(stock) {
        this.stock = stock
    }
    getStock() {
        return this.stock
    }
    getCantidad() {
        return this.cantidad
    }
}
    

   



