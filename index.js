//Victoria Vega Bernal - 00000247804

//Primero se importan los daos y la instancia del sequelize
const ProductoDAO = require('./dataAccess/productoDAO');
const VentaDAO = require('./dataAccess/ventaDAO');
const ProductoVentaDAO = require('./dataAccess/productoVentaDAO');
const { sequelize } = require('./models');

//Función para probar las transacciones
async function realizarTransacciones() {
    try {
        //Sincronizamos los modelos con la base de datos
        await sequelize.sync();

        //Creamos un ejemplo de un prodducto
        const producto = await ProductoDAO.crearProducto('Producto 1', 10.99, 50);
        console.log('Producto creado: ', producto.toJSON()); //Lo imprimimos

        //Creamos un ejemplo de una venta
        const venta = await VentaDAO.crearVenta(100.0, 15.0);
        console.log('Venta creada: ', venta.toJSON()); //Lo imprimimos

        //Creamos un ejemplo de un productoventa que se asocia a la venta y el producto
        const productoVenta = await ProductoVentaDAO.crearProductoVenta(venta.id, producto.id, 3, 32.97, 10.99);
        console.log('ProductoVenta creado: ', productoVenta.toJSON()); //Lo imprimimos

        //Obtenemos todos los productos
        const productos = await ProductoDAO.obtenerProductos();
        console.log('Productos: ', productos); //Los imprimimos

        //Obtenemos todas las ventas
        const ventas = await VentaDAO.obtenerVentas();
        console.log('Ventas: ', ventas); //Las imprimimos

        //Actualizamos un producto cambinando sus valores
        await ProductoDAO.actualizarProducto(producto.id, 'Producto actualizado', 15.99, 40);
        console.log('Producto actualizado.');

        //Para eliminar una venta primero eliminamos el productoventa que tiene asociado
        await ProductoVentaDAO.eliminarProductoVenta(productoVenta.id);
        //Ahora sí eliminamos la venta
        await VentaDAO.eliminarVenta(venta.id);
        console.log('Venta eliminada.');

        //Obtenemos las ventas para ver que se haya eliminado correctamente
        const ventasActualizadas = await VentaDAO.obtenerVentas();
        console.log('Ventas actualizadas: ', ventasActualizadas); //Las imprimimos
    } catch (error) {
        //Manejo de errores por si falla una transacción
        console.error('Error en las transacciones: ', error);
    } finally {
        //Se debe cerrar la conexión al terminar todas las transacciones
        await sequelize.close();
    }
}

//Llamamos a la función para probar
realizarTransacciones();