const ProductoDAO = require('./dao/productoDAO');

async function main() {
    const producto = await ProductoDAO.crearProducto('Producto A', 100.50, 10);
    console.log(producto.toJSON());
}