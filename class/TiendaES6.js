class Tienda {
    constructor(nombre) {
        this.nombre = nombre;
        this.productos = [];
    }
    setProductos(producto) {
        this.productos.push(producto);
    }
    getProductos() {
        return this.productos;
    }
}


