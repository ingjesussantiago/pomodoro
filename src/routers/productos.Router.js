import { Router } from "express"
import { managerProducto } from "../dao/manager/managerProducto.js"
import { __dirname } from "../utils.js"

const router = Router()

const ManagerProducto = new managerProducto(__dirname + "/dao/data/productos.json")
router.get("/", async (req, res) => {
    const productos = await ManagerProducto.getProduct()
    res.render("pomodoro", { productos })
    // res.json({ productos })
})

router.post("/", async (req, res) => {
    const producto = req.body
    const nuevoProducto = await ManagerProducto.addProduct(producto)
    // res.json({ message: "Producto creado", producto: nuevoProducto })
    res.redirect("/pomodoro")
})

//Este elimina con post por formulario
router.post("/eliminarId",async(req,res)=>{
    const id =req.body.id
    const productos = await ManagerProducto.getProduct()
    const arrayNew= await ManagerProducto.delateProductById(id)
    res.redirect("/pomodoro")

})







router.delete("/", async (req, res) => {
    const message = await ManagerProducto.delateProduct()
    res.json({ message })
})

router.delete("/:idProducto", async (req, res) => {
    const { idProducto } = req.params
    const message = await ManagerProducto.delateProductById(+idProducto)
    res.json({ message: "Producto borrado", producto: message })
})

router.put("/:idProducto", async (req, res) => {
    const { idProducto } = req.params
    const productoup = req.body
    const producto = await ManagerProducto.upDateProduc(+idProducto, productoup)
    res.json({ producto })
})




export default router