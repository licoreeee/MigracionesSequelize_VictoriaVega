const { Producto } = require('../models');

class ProductoDAO { 
    constructor() {}

    async crearProducto(nombre, precio, cantidad) {
        try { 
            const producto = await Producto.create({ nombre, precio, cantidad });
            return producto;
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductoPorId() { 
        try {
            const productos = await Producto.findAll();
            return productos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductoPorId() {
        try {
            const producto = await Producto.findByPk(id);
            return producto;
        } catch (error) {
            throw error;
        }
    }

    async actualizarProducto(id, nombre, precio, cantidad) {
        try {
            await Producto.update({ nombre, precio, cantidad }, { where: { id } });
            const producto = await Producto.findByPk(id);
            return producto;
        } catch (error) {
            throw error;
        }
    }

    async eliminarProducto(id) {
        try {
            const producto = await Producto.findByPk(id);
            if (!producto) {
                throw new Error('No se encontró el producto.');
            }
            await producto.destroy();
            return 'Producto eliminado con éxito.';
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ProductoDAO();