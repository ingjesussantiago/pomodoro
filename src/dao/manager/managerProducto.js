import fs from "fs";

export class managerProducto {

    constructor(path) {

        this.path = path
    }

    getProduct = async () => {
        if (fs.existsSync(this.path)) {
            const buscarProduct = await fs.promises.readFile(this.path, "utf-8")
            const productos = JSON.parse(buscarProduct)
            return productos
        } else {
            console.log("no hay archivo")
            return []

        }
    }

    addProduct = async (producto) => {
        if (!producto.title || !producto.descripcion || !producto.status) {
            return "error. faltan campos obligatorios"
        }
        const productos = await this.getProduct()
        const id = this.#generarId(productos)
        const nuevoProducto = { id, ...producto }
        productos.push(nuevoProducto)

        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        return nuevoProducto
    }

    getProductoById = async (id) => {
        const productos = await this.getProduct()
        const productoId = productos.find(u => u.id === id)
        if (productoId) {
            return productoId
        } else {
            return "producto no existe chequeo"
        }




    }

    upDateProduc = async (id, obj) => {
        const productos = await this.getProduct()
        const indexProductos = productos.findIndex((u) => u.id === id)
        if (indexProductos === -1) {
            return "no encontrado"
        }

        const productoActualizado = { ...productos[indexProductos], ...obj }
        productos.splice(indexProductos, 1, productoActualizado)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))

    }

    delateProduct = async () => {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path)
            return "archivo eliminado"
        } else {
            return "este archivo no existe"
        }

    }

    delateProductById = async (id) => {
        console.log("dentreeo",id);
        const productos = await this.getProduct()
        const arrayNew = productos.filter(e => e.id !== +id)
        console.log("arrayNew", arrayNew);
        await fs.promises.writeFile(this.path, JSON.stringify(arrayNew))
        return "borrado"

    }



    #generarId = (productos) => {

        let id
        if (productos.length === 0) {
            id = 1
        } else {
            id = productos[productos.length - 1].id + 1
        }
        return id

    }

}